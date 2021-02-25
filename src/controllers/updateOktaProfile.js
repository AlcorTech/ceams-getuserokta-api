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
const updateOktaProfile = (req, res) => {
  const userName = req.body.userName;
  const profile= req.body.profile;
//security check otherwise a hacker intrid  
  let postData=   JSON.stringify({ 
    profile
  })

  logger.log(
    LoggingLevels.TRACE,
    "Responding to a request for the /Authn API path....."
  );

  oktaUserService
    .updateOktaProfile(userName, postData)
    .then((result) => {

      let getUsersJsonResponse = JSON.parse(result);
    res.json(getUsersJsonResponse);
    console.log(result);
      console.log(getUsersJsonResponse);
      logger.log(
        LoggingLevels.TRACE,
        "determine if the Okta User Results Array contains at least one user..."
      );
    })
    // Catch the error message when calling the Okta List Users with Search
    // API
    .catch((err) => {
      logger.log(
        LoggingLevels.ERROR,
        constants.ERRPASS001 +
          ": " +
          constants.ERROR_MESSAGE_OKTA_LIST_USER_WITH_SEARCH_SERVICE +
          ":  ",
        JSON.stringify(err)
      );

      // Response back to calling client, general error message returned in
      // response; the details of error are recoded in app logs.
      res.status(constants.HTTP_STATUS_CODE_SERVER_ERROR);
      res.json(constants.getUsersJsonResponse);
    });
};

module.exports = {
  updateOktaProfile,
};
