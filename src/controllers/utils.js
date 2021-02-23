/**
 * File: utils.js
 *
 * Description: A utility method for the controllers and services
 */

const { logger, LoggingLevels } = require("../../config/winston");

/**
 * Determine if the specified attribute is defined by verifying if the
 * specified JSON attribute is undefined or null.  If the JSON attribute
 * is not undefiend and not null then a boolean ture is returned; otherwise,
 * a boolean true is returned.
 *
 * @param {string} jsonAttributeName the name of the JSON Attribute which
 *  is used in a logging message
 * @param {*} jsonAttribute the JSON Attribute to determine if the
 *  attribute is defined or not defined
 * @returns a boolean true if the JSON attribute is not undefiend and not null;
 *  otherwise, false is returned
 */
function isJsonAttributeDefined(jsonAttributeName, jsonAttribute) {
  let isJsonAttributeDefined = false;

  if (undefined !== jsonAttribute && null !== jsonAttribute) {
    isJsonAttributeDefined = true;
  }

  logger.log(
    LoggingLevels.TRACE,
    "is JSON Attribute '" +
      jsonAttributeName +
      "' Defined: " +
      isJsonAttributeDefined
  );

  return isJsonAttributeDefined;
}

/**
 * Determines if the specified JSON Array is empty.  A JSON Array is considered
 * to be empty if the JSON Array is undefined, null, or has zero elements
 * (length is equal to zero).  If the specified 'jsonArray' parameter is not
 * an Array then boolean true is returned.
 *
 * @param {*} jsonArrayName the name of the JSON Array that will be used in an
 * application logging message
 * @param {*} jsonArray the JSON Array Element to test for being empty
 * @return boolean value of true if the specified jsonArray is undefined, null,
 *  or has a length of zero.  If the 'jsonArray' input is not an Array then
 *  a boolean value of true is returned
 */
function isJsonArrayEmpty(jsonArrayName, jsonArray) {
  let isJsonArrayEmpty = false;

  // if specified jsonArray is undefined or null
  // then return true
  if (jsonArray === undefined) {
    logger.log(
      LoggingLevels.TRACE,
      "The specified jsonArray parameter with name: '" +
        jsonArrayName +
        "' is undefined or null and is empty"
    );
    return true;
  }

  // if the specified JSON 'jsonArray' is NOT an Array
  // then return true as this indicates the format of the
  // input prameter is incorrect.
  if (!Array.isArray(jsonArray)) {
    logger.log(
      LoggingLevels.TRACE,
      "The specified jsonArray parameter with name: '" +
        jsonArrayName +
        "' is not an Array and thus is empty"
    );
    return true;
  }

  let jsonArrayLength = jsonArray.length;

  // If the Array Length is zero then the Array is empty
  if (jsonArrayLength == 0) {
    isJsonArrayEmpty = true;
  }

  logger.log(
    LoggingLevels.TRACE,
    "is JSON Array '" +
      jsonArrayName +
      "' with length=[" +
      jsonArrayLength +
      "] Empty: " +
      isJsonArrayEmpty
  );

  return isJsonArrayEmpty;
}

module.exports = {
  isJsonAttributeDefined,
  isJsonArrayEmpty,
};
