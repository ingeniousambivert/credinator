"use strict";

function verifyCardNumber(num) {
  let inputNum = num.toString();
  let sum = 0;
  let doubleUp = false;

  /* the right to left method */
  for (let i = inputNum.length - 1; i >= 0; i--) {
    let curDigit = parseInt(inputNum.charAt(i));

    if (doubleUp) {
      if (curDigit * 2 > 9) {
        sum += curDigit * 2 - 9;
      } else {
        sum += curDigit * 2;
      }
    } else {
      sum += curDigit;
    }
    doubleUp = !doubleUp;
  }

  return sum % 10 == 0 ? true : false;
}

module.exports = verifyCardNumber;
