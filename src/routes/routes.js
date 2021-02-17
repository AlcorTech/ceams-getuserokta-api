/**
 * File: routes.js
 * Description: Establishes the Express Routes for the authn 
 *  Service
 */

const express = require("express");
const constants = require("../resources/constants");
const authentication = require("../controllers/auth-controller");

const router = express.Router();

// Router for the login with credentials  API.
router.post(
  "/" + constants.AUTHN_SERVICE_URI,
  authentication.getUserOkta
);

// Exports the routes to make accessible to other files in project
module.exports = router;
