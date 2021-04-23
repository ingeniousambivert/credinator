const GenerateCreditCard = require("../utils/generator");
const { brandsList, banksList, countriesList } = require("../utils/fixtures");
const verifyCardNumber = require("../utils/verify");
const { serverErrorMessage } = require("../utils/");

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
    res.status(200).send(countriesList);
  } catch (error) {
    console.log(error);
    res.status(400).send(serverErrorMessage);
  }
}

function generateCards(req, res) {
  try {
    let {
      brand,
      country,
      minMoney,
      maxMoney,
      cvv,
      pin,
      month,
      year,
      quantity,
    } = req.body;

    if (typeof country === "undefined")
      res.status(400).send("Please input a country name");
    if (typeof brand === "undefined")
      res.status(400).send("Please input a brand name");
    else {
      const creditCards = GenerateCreditCard(
        brand,
        country,
        minMoney,
        maxMoney,
        cvv,
        pin,
        month,
        year,
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
      res.status(200).json({ status: "valid", result });
    } else {
      res.status(200).json({ status: "invalid", result });
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
