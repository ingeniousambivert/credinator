# Credinator

This generator uses [Luhn Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) to generate valid credit card numbers. It provides method generate(prefix,length), which for a given prefix and total length will return a valid credit card number. Credit card numbers have the following form: **PPPPPP NNNNNNNNN C**. Where **P** is a prefix that identifies the issuing authority, **N** is an account number and **C** is a checksum digit, calculated with *Luhn algorithm*. For a card with an even number of digits, double every odd numbered digit and subtract 9 if the product is greater than 9. Add up all the even digits as well as the doubled-odd digits, and the result must be a multiple of 10 or it's not a valid card. If the card has an odd number of digits, perform the same addition doubling the even numbered digits instead.

Read more [here](https://childofcode.com/java-script-luhn-algorithm/).

## Installation

Use [npm](https://www.npmjs.com/) to install all the dependencies.

```bash
npm install
```

## Usage

*Server*
Production Mode

```bash
npm start
```

Development Mode

```bash
DEBUG=credit-card-generator-api:* npm run dev
```

*Client*
Development Mode

```bash
yarn start
```

Local Client URL :  `http://localhost:3000`
Local Server URL :  `http://localhost:8000`


## Built with

[React](https://reactjs.org/)

[ExpressJS](https://expressjs.com)

[NodeJS](https://nodejs.org)
