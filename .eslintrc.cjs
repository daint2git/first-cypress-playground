/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["./cypress/**/*.{ts,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
};
