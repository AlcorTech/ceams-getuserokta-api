/**
 * File: okta-service.js
 *
 * Description: Implements the service call to talk to OKTA server with the
 * given body, which is passed from all respective controllers.
 */

const config = require("../../config/config");
const constants = require("../resources/constants");
const { logger, LoggingLevels } = require("../../config/winston");
const https = require("https");

/**
 *takes the body alone passed from controller
 */
const changePassword = (userName, postData) => {
  let authnLoginLogMsg = "Inside the OKTA service : ";

  //logger.log(LoggingLevels.INFO, authnLoginLogMsg);

  let hostname = config.OKTA_API_HOSTNAME;
  let path =
    config.OKTA_CHANGEPASSWORD_API_PATH +
    userName
   // "/credentials/change_password";

  // logger.log(LoggingLevels.INFO, authnLoginLogMsg + " " + hostname + path);

  // Set the Header Authorization option to the Okta API Token
  let authorization =
    constants.OKTA_HTTP_AUTHORIZATION_SCHEMA_TYPE + " " + config.OKTA_TOKEN;

  // set Options for the HTTP POST request to the Okta
  var options = {
    hostname: `${hostname}`,
    path: `${path}`,
    method: "GET",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
  };

  return new Promise(function (resolve, reject) {
    var httpsReq = https.request(options, (response) => {
      var result = "";
      response.on("data", function (chunk) {
        result += chunk;
      });
      response.on("end", function () {
        resolve(result);
        logger.log(
          LoggingLevels.INFO,
          "received JSON response from Okta sd  Authn " +
            "with statusCode: " +
            response.statusCode
        );
      });
      response.on("error", function (err) {
        reject(err);
        logger.log(
          LoggingLevels.ERROR,
          "failed to obtain respsone from Okta authn:" + err
        );
      });
    });
    httpsReq.write(postData);
    httpsReq.end();
  });
};

module.exports = {
  changePassword,
};
