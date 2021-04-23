"use strict";
const faker = require("faker");
const { trimSpaceLower, reverseString } = require("./index");

const {
  visaPrefixList,
  mastercardPrefixList,
  americanExpressPrefixList,
  dinersInternationalPrefixList,
  dinersUsaCadPrefixList,
  discoverPrefixList,
  ukrPrefixList,
  jcbPrefixList,
  voyagerPrefixList,
  chinaTUnionPrefixList,
  chinaUnionPayPrefixList,
  troyPrefixList,
  vervePrefixList,
  maestroPrefixList,
  npsPridnestroviePrefixList,
  mirPrefixList,
  dankortPrefixList,
  lankaPayPrefixList,
  uatpPrefixList,
  interPaymentPrefixList,
  maestroUkPrefixList,
  instaPaymentPrefixList,
  rupayPrefixList,
} = require("./fixtures");

const Brands = {
  visa: {
    prefixList: visaPrefixList,
    digitCount: 16,
  },
  mastercard: {
    prefixList: mastercardPrefixList,
    digitCount: 16,
  },
  americanexpress: {
    prefixList: americanExpressPrefixList,
    digitCount: 15,
  },
  dinersinternational: {
    prefixList: dinersInternationalPrefixList,
    digitCount: 19,
  },
  dinersusacad: {
    prefixList: dinersUsaCadPrefixList,
    digitCount: 16,
  },
  discover: {
    prefixList: discoverPrefixList,
    digitCount: 16,
  },
  jcb: {
    prefixList: jcbPrefixList,
    digitCount: 16,
  },
  voyager: {
    prefixList: voyagerPrefixList,
    digitCount: 16,
  },
  chinatunion: {
    prefixList: chinaTUnionPrefixList,
    digitCount: 19,
  },
  chinaunionpay: {
    prefixList: chinaUnionPayPrefixList,
    digitCount: 16,
  },
  ukr: {
    prefixList: ukrPrefixList,
    digitCount: 16,
  },
  troy: {
    prefixList: troyPrefixList,
    digitCount: 16,
  },
  verve: {
    prefixList: vervePrefixList,
    digitCount: 16,
  },
  maestro: {
    prefixList: maestroPrefixList,
    digitCount: 19,
  },
  nps: {
    prefixList: npsPridnestroviePrefixList,
    digitCount: 16,
  },
  mir: {
    prefixList: mirPrefixList,
    digitCount: 16,
  },
  dankort: {
    prefixList: dankortPrefixList,
    digitCount: 16,
  },
  lankapay: {
    prefixList: lankaPayPrefixList,
    digitCount: 16,
  },
  uatp: {
    prefixList: uatpPrefixList,
    digitCount: 15,
  },
  interpayment: {
    prefixList: interPaymentPrefixList,
    digitCount: 16,
  },
  maestrouk: {
    prefixList: maestroUkPrefixList,
    digitCount: 12,
  },
  instapayment: {
    prefixList: instaPaymentPrefixList,
    digitCount: 16,
  },
  rupay: {
    prefixList: rupayPrefixList,
    digitCount: 16,
  },
};

const pseudoRandom = Math.random;

function generateCVV() {
  return Math.floor(100 + Math.random() * 900);
}

function generateCardPin() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateMoney(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function generateExpiryDate(minimum, maximum) {
  if (minimum < 2021 || typeof minimum === "undefined") minimum = 2021;
  if (maximum > 2030 || typeof maximum === "undefined") maximum = 2030;

  const month = Math.floor(Math.random() * (12 - 1)) + 1;
  const year = Math.floor(Math.random() * (maximum - minimum)) + minimum;
  const date = `${month}/${year}`;

  return date;
}

function generateCardNumber(prefix, length) {
  let ccnumber = prefix;
  while (ccnumber.length < length - 1) {
    ccnumber += Math.floor(pseudoRandom() * 10);
  }

  let reversedCCnumberString = reverseString(ccnumber);
  let reversedCCnumber = new Array();

  for (let index = 0; index < reversedCCnumberString.length; index++) {
    reversedCCnumber[index] = parseInt(reversedCCnumberString.charAt(index));
  }

  let sum = 0;
  let pos = 0;

  while (pos < length - 1) {
    let odd = reversedCCnumber[pos] * 2;
    if (odd > 9) {
      odd -= 9;
    }

    sum += odd;

    if (pos != length - 2) {
      sum += reversedCCnumber[pos + 1];
    }
    pos += 2;
  }

  let checkSumDigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  ccnumber += checkSumDigit;

  return ccnumber;
}

function GenerateCreditCard(
  cardBrand,
  bank,
  country,
  minMoney,
  maxMoney,
  quantity
) {
  cardBrand = trimSpaceLower(cardBrand);
  if (typeof quantity === "undefined") quantity = 1;
  if (typeof minMoney === "undefined") minMoney = 500;
  if (typeof maxMoney === "undefined") maxMoney = 1000;

  if (typeof Brands[cardBrand] !== "undefined") {
    const prefixList = Brands[cardBrand].prefixList;
    const length = Brands[cardBrand].digitCount;
    let result = new Array();

    for (let i = 0; i < quantity; i++) {
      let card = new Object();
      card["bank"] = bank.toUpperCase();
      card["card_brand"] = cardBrand.toUpperCase();
      let randomArrayIndex = Math.floor(pseudoRandom() * prefixList.length);
      let ccnumber = prefixList[randomArrayIndex];
      card["card_number"] = generateCardNumber(ccnumber, length);
      card["country"] = country.toUpperCase();
      card["name"] = faker.name.findName().toUpperCase();
      card["address"] =
        faker.address.streetAddress().toUpperCase() +
        faker.address.city().toUpperCase();
      card["cvv"] = generateCVV();
      card["card_pin"] = generateCardPin();
      card["money"] = generateMoney(minMoney, maxMoney);
      card["expiry_date"] = generateExpiryDate();
      result.push(card);
    }

    return result;
  } else return new Error("Credit card issuer is invalid or does not exist");
}

module.exports = GenerateCreditCard;
