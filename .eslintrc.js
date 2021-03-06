module.exports = {
  extends: ["prettier", "eslint:recommended"],
  plugins: ["prettier"],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "arrow-parens": ["error", "always"],
    "generator-star-spacing": ["error", "after"],
  },
};
