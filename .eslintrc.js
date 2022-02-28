module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  settings: {
    react: {
        version: "detect",
      },
  },
  rules: {
    "block-scoped-var": "error",
    "no-extend-native": "error",
    "no-proto": "error",
    "no-var": "error",
    yoda: "error",
    "no-useless-constructor": "off",
  },
};
