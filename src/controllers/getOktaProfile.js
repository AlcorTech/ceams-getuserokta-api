const {
  default: xPermittedCrossDomainPolicies,
} = require("helmet/dist/middlewares/x-permitted-cross-domain-policies");
const { logger, LoggingLevels } = require("../../config/winston");
const constants = require("../resources/constants");

const oktaUserService = require("../service/Okta-service");

/**
 * Initiates the request users authentication with username and password

 *
 * @param {*} req the HTTP Request Object
 * @param {*} res the HTTP Response Object
 */
const getOktaProfile = (req, res) => {
  const userName = req.body.userName;

   let postData=   JSON.stringify({ 
    
  })

  logger.log(
    LoggingLevels.INFO,
    "Responding to a request for the /Authn API path....."
  );

  oktaUserService
    .updateOktaProfile(userName, postData)
    .then((result) => {
      let getUsersJsonResponse = JSON.parse(result);
      let getUserResponse = {
        lastlogintime: getUsersJsonResponse.lastLogin,
        userFullName:
          getUsersJsonResponse.profile.lastName +
          "," +
          getUsersJsonResponse.profile.firstName,
        userId: getUsersJsonResponse.profile.login,
        passwordChanged:getUsersJsonResponse.passwordChanged,
        status: true,
      };
      logger.log(
        LoggingLevels.INFO,
        "determine if the Okta User Results Array contains at least one user..."
      );
      if (getUsersJsonResponse.status === "ACTIVE") {
        logger.log(LoggingLevels.INFO, "success");
        res.json(getUserResponse);
      }
      if (getUsersJsonResponse.status === "LOCKED_OUT") {
        logger.log(LoggingLevels.INFO, "Locked out");
        res.json(constants.LOCKED_OUT_ERROR);
      }
      if (getUsersJsonResponse.status === "DEPROVISIONED") {
        logger.log(LoggingLevels.INFO, "In active user");
        res.json(constants.USER_DEACTIVATED_ERROR);
      }
      if (getUsersJsonResponse.status === "SUSPENDED") {
        logger.log(LoggingLevels.INFO, "In active user");
        res.json(constants.USER_NOT_ACTIVE_ERROR);
      }
      if (getUsersJsonResponse.status === "PASSWORD_EXPIRED") {
        logger.log(LoggingLevels.INFO, "In active user");
        res.json(constants.USER_PASSWORD_EXPIRY_ERROR);
      }
      if (getUsersJsonResponse.status === "RECOVERY") {
        logger.log(LoggingLevels.INFO, "In active user");
        res.json(constants.USER_PASSWORD_EXPIRY_ERROR);
      }
    })
    // Catch the error message when calling the Okta List Users with Search
    // API
    .catch((err) => {
      logger.log(
        LoggingLevels.ERROR,
        constants.ERRPASS001 +
          ": " +
          constants.ERROR_MESSAGE_OKTA_LIST_USER_WITH_SEARCH_SERVICE +
          ": ",
        JSON.stringify(err)
      );

      // Response back to calling client, general error message returned in
      // response; the details of error are recoded in app logs.
      res.status(constants.HTTP_STATUS_CODE_SERVER_ERROR);
      res.json(constants.USER_NOT_FOUND_ERROR);
    });
};

module.exports = {
  getOktaProfile,
};
