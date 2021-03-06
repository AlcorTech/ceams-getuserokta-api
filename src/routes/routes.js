/**
 * File: routes.js
 * Description: Establishes the Express Routes for the authn
 *  Service
 */

const express = require("express");
const constants = require("../resources/constants");
const getOktaProfile = require("../controllers/getOktaProfile");
const updateOktaProfile = require("../controllers/updateOktaProfile");

const router = express.Router();

router.post("/getProfile", getOktaProfile.getOktaProfile);
router.post("/updateProfile", updateOktaProfile.updateOktaProfile);
// Exports the routes to make accessible to other files in project
module.exports = router;
