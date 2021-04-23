const GenerateCreditCard = require("../utils/generator");
const {
  brandsList,
  banksList,
  countriesByBanksList,
} = require("../utils/fixtures");
const verifyCardNumber = require("../utils/verify");
const { sanitizeString, serverErrorMessage } = require("../utils/");

function getBrands(req, res) {
  try {
    res.status(200).send(brandsList);
  } catch (error) {
    console.log(error);
    res.status(400).send(serverErrorMessage);
  }
}

function getBanks(req, res) {
  try {
    res.status(200).send(banksList);
  } catch (error) {
    console.log(error);
    res.status(400).send(serverErrorMessage);
  }
}

function getCountries(req, res) {
  try {
    const { bank } = req.body;
    if (typeof bank === "undefined") {
      res.status(400).json("Please input a bank name");
    }
    const banks = Object.keys(countriesByBanksList);
    let response = new Array();

    for (let bankName of banks) {
      if (sanitizeString(bank) === sanitizeString(bankName)) {
        response = countriesByBanksList[bankName];
      }
    }

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(serverErrorMessage);
  }
}

function generateCards(req, res) {
  try {
    let { brand, bank, country, min_money, max_money, quantity } = req.body;
    if (typeof bank === "undefined")
      res.status(400).send("Please input a bank name");
    if (typeof country === "undefined")
      res.status(400).send("Please input a country name");
    if (typeof brand === "undefined")
      res.status(400).send("Please input a brand name");
    else {
      const creditCards = GenerateCreditCard(
        brand,
        bank,
        country,
        min_money,
        max_money,
        quantity
      );
      res.status(200).send(creditCards);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(serverErrorMessage);
  }
}

function verifyCard(req, res) {
  try {
    const result = verifyCardNumber(req.body.number);
    if (result === true) {
      res.status(200).send(`Credit card number is VALID : ${result}`);
    } else {
      res.status(200).send(`Credit card number is NOT VALID : ${result}`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(serverErrorMessage);
  }
}

module.exports = {
  getBrands,
  getBanks,
  getCountries,
  generateCards,
  verifyCard,
};
