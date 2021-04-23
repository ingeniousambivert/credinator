# Credit Card Generator

This generator uses [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) to generate valid credit card numbers. It provides method generate(prefix,length), which for a given prefix and total length will return a valid credit card number. Credit card numbers have the following form: **PPPPPP NNNNNNNNN C**. Where **P** is a prefix that identifies the issuing authority, **N** is an account number and **C** is a checksum digit, calculated with *Luhn algorithm*. For a card with an even number of digits, double every odd numbered digit and subtract 9 if the product is greater than 9. Add up all the even digits as well as the doubled-odd digits, and the result must be a multiple of 10 or it's not a valid card. If the card has an odd number of digits, perform the same addition doubling the even numbered digits instead.

Read more [here](https://childofcode.com/java-script-luhn-algorithm/).

## Installation

Use [npm](https://www.npmjs.com/) to install all the dependencies.

```bash
npm install
```

## Usage

Production Mode

```bash
npm start
```

Development Mode

```bash
DEBUG=credit-card-generator-api:* npm run dev
```

Local URL :  `http://localhost:8000`

## Routes

- **GET** `/generator/brands` : returns an array of strings with card brand names.
  
  ```js
  // response 
  [
    "VISA", (String)
    "MasterCard", (String)
    "AmericanExpress", (String)
    "DinersInternational", (String)
    ...
  ]
  ```

- **GET** `/generator/banks` : returns an array of strings with bank names.
  
  ```js
  // response 
  [
    "ABHYUDAYA CO-OPERATIVE BANK, LTD.", (String)
    "ABN AMRO BANK, N.V.", (String)
    "ALLAHABAD BANK", (String)
    "ANDHRA BANK", (String)
    ...
  ]
  ```

- **POST** `/generator/countries` :  Takes in the following type of body parameters(not case-sensitive)

  ```js
  // parameters 
  {
    "bank":"HONG KONG AND SHANGHAI BANKING CORP., LTD." (String)
  }
  ```

  returns an array of strings with country names.

  ```js
  // response
  [
    "India"
  ]
  ```

- **POST** `/generator/generate` : Takes in the following type of body parameters(not case-sensitive)

  ```js
  // parameters
  {
    "brand":"MasterCard", (String)
    "bank":"CITIBANK",(String)
    "country":"India",(String)
    "quantity":10 (Number)
  }
  ```

  returns a single card object or an array of objects.

  ```js
  // response 
  {
        "bank": "CITIBANK", (String)
        "card_brand": "MASTERCARD", (String)
        "card_number": "2288134094412877", (Number)
        "country": "INDIA", (String)
        "name": "MISS VERA BAUMBACH", (String)
        "address": "16516 EMARD LANDINGPLEASANTON", (String)
        "cvv": 616, (Number) 
        "card_pin": 4300, (Number)
        "money": 530, (Number)
        "expiry_date": "8/2026" (String)
    }
  ```

- **POST** `/generator/verify` : Takes in the following type of body parameters

  ```js
  // parameters
  {
    "number":2511058888886260 (Number)
  }
  ```

  returns a string message with VALID or NOT VALID keywords and a boolean.

## Built with

[ExpressJS](https://expressjs.com)

[NodeJS](https://nodejs.org)
