/**
 * This file carries all the application messages. The constants defined in
 * this file cannot be modified during program execution.
 */
module.exports = Object.freeze({
  /** Name of the Authenticate Service API */
  API_NAME: 'authenticationService',

  /** Default Express Server Port */
  EXPRESS_SERVER_PORT_DEFAULT: 3000,

 

 // ###########################################################################
 // #                  SERVICE ROUTE NAMES                                   #
 // ###########################################################################

  /** The route of the Health Check for the API */
  HEALTH_CHECK_URI: 'healthCheck',

  /** The route to login */
  AUTHN_SERVICE_URI: 'login',

 // ###########################################################################
 // #                  HTTP STATUS CODEs                                      #
 // ###########################################################################

  /** HTTP Status Code for Success */
  HTTP_STATUS_CODE_OK : 200,

  /** HTTP Status Code for Bad Request */
  HTTP_STATUS_CODE_BAD_REQUEST : 400,

  /** HTTP Status Code for Resource Not Found */
  HTTP_STATUS_CODE_NOT_FOUND: 404,

  /** HTTP Status Code for Internal Server Error */
  HTTP_STATUS_CODE_SERVER_ERROR: 500,

 // ###########################################################################
 // #                  OKTA CONSTANTS                                         #
 // ###########################################################################

  /** Okta's Custom Authorization Schema Type */
  OKTA_HTTP_AUTHORIZATION_SCHEMA_TYPE: 'SSWS',

   /**encountered 403 */
   ERRAUTH001: 'ERRAUTH001',
   

  
CEAMS_GENERIC_ERROR_TEXT : 'An unexpected error has occurred. Please contact your help desk with the errorcode :',
// ###########################################################################
// #                           HEALTH CHECK ROUTE                            #
// ###########################################################################

  /** Message to render for successful Health Check */
  HEALTH_CHECK_MESSAGE: 'The CEAMS Authentication API is running...',


  /** Error message to display if error occurs in Okta Seach User */
  ERROR_MESSAGE_OKTA_LIST_USER_WITH_SEARCH_SERVICE:
    'An error occurred and was caught by the Promise catch() while calling the '
    + 'Okta List Users with Search API',
  
});
