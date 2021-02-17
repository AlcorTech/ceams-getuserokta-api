const { logger, LoggingLevels } = require("../../config/winston");
const constants = require("../resources/constants");
const oktaUserService = require("../service/Okta-service");


/**
 * Initiates the request users authentication with username and password

 *
 * @param {*} req the HTTP Request Object
 * @param {*} res the HTTP Response Object
 */
const getUserOkta = (req, res) => {
  const username = req.body.username;

  let postData = JSON.stringify({
    username: username,
    options: {
      multiOptionalFactorEnroll: false,
      warnBeforePasswordExpired: false
    }
  });

  logger.log(
    LoggingLevels.TRACE,
    "Responding to a request for the /Authn API path....."
  );

  
    oktaUserService.getUserOkta(postData)
      .then(result => {
        
        let getOktaUserJsonResponse = JSON.parse(result);
        console.log(getOktaUserJsonResponse)
    
        logger.log(
          LoggingLevels.TRACE,
          "determine if the Okta User Results Array contains at least one user..."
        );
        res.json(getOktaUserJsonResponse);
        
      })
      // Catch the error message when calling the Okta List Users with Search
      // API
      .catch(err => {
        logger.log(
          LoggingLevels.ERROR,
          constants.ERRAUTH001 +
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
          errorCode: constants.ERRAUTH001,
          statusText:"Error in OKTA call Authn",
        });
      });
 
};

module.exports = {
  getUserOkta
};
