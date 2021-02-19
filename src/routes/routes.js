/**
 * File: routes.js
 * Description: Establishes the Express Routes for the authn
 *  Service
 */

const express = require("express");
const constants = require("../resources/constants");
const changePassword = require("../controllers/changepassword");

const router = express.Router();

router.get("/getusers", changePassword.changePassword);
// Exports the routes to make accessible to other files in project
module.exports = router;
