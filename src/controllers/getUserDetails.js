const { default: xPermittedCrossDomainPolicies } = require("helmet/dist/middlewares/x-permitted-cross-domain-policies");
const { logger, LoggingLevels } = require("../../config/winston");
const constants = require("../resources/constants");
const oktaUserService = require("../service/Okta-service");

/**
 * Initiates the request users authentication with username and password

 *
 * @param {*} req the HTTP Request Object
 * @param {*} res the HTTP Response Object
 */
const getUserDetails = (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const userName = req.body.userName;

  let postData = JSON.stringify({
    oldPassword: oldPassword,
    newPassword: newPassword,
  });

  logger.log(
    LoggingLevels.TRACE,
    "Responding to a request for the /Authn API path....."
  );

  oktaUserService
    .getUserDetails(userName, postData)
    .then((result) => { 
      let getUsersJsonResponse = JSON.parse(result);
      let getUserResponse ={
        lastlogintime: getUsersJsonResponse.lastLogin,
        userFullName: getUsersJsonResponse.profile.lastName+ "," +
        getUsersJsonResponse.profile.firstName,
        userId: getUsersJsonResponse.profile.login
      }

      let errorResponse = { 
          "errorCode": "ERRPASS001",
          "statusText": "Error in OKTA call Authn"
      }
      console.log(getUsersJsonResponse)
      logger.log(
        LoggingLevels.TRACE,
        "determine if the Okta User Results Array contains at least one user..."
      );
      if(getUsersJsonResponse.status === 'ACTIVE'){
        console.log (LoggingLevels.INFO,"success");
        res.json(getUserResponse);
      }
      else {
        console.log (LoggingLevels.INFO,"success");
        res.json(errorResponse);
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
      res.json({
        ok: false,
        errorCode: constants.ERRPASS001,
        statusText: "Error in OKTA call Authn",
      });
    });
};

module.exports = {
  getUserDetails,
};