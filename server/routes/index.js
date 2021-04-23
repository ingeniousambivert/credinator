"use strict";

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Welcome To Credit Card Generator API");
});

module.exports = router;
