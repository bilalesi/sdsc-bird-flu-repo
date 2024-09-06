/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@sdsc/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
