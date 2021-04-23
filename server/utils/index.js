function sanitizeString(str) {
  return str.toLowerCase().replace(/[^A-Z0-9]/gi, "");
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function trimSpaceLower(str) {
  return str.toLowerCase().replace(/\s/g, "");
}

const serverErrorMessage = "Server Error : Something went wrong";

module.exports = {
  sanitizeString,
  trimSpaceLower,
  reverseString,
  serverErrorMessage,
};
