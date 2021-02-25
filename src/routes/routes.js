/**
 * File: routes.js
 * Description: Establishes the Express Routes for the authn
 *  Service
 */

const express = require("express");
const constants = require("../resources/constants");
const getUserDetails = require("../controllers/getUserDetails");
const updateOktaProfile = require("../controllers/updateOktaProfile");

const router = express.Router();

router.get("/getOktaProfile", getUserDetails.getUserDetails);
router.post("/updateOktaProfile", updateOktaProfile.updateOktaProfile);
// Exports the routes to make accessible to other files in project
module.exports = router;
