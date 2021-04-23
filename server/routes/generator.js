"use strict";

const express = require("express");
const router = express.Router();
const {
  getBrands,
  getBanks,
  getCountries,
  generateCards,
  verifyCard,
} = require("../controllers/generator");

router.get("/brands", getBrands);

router.get("/banks", getBanks);

router.get("/countries", getCountries);

router.post("/generate", generateCards);

router.post("/verify", verifyCard);

module.exports = router;
