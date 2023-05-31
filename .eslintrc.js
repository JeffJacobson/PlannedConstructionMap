const errorLevelBasedOnEnv = process.env.NODE_ENV === "production" ? "warn" : "off";
module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
  ],
  plugins: [
    "eslint-plugin-tsdoc"
  ],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": errorLevelBasedOnEnv,
    "no-debugger": errorLevelBasedOnEnv,
    "tsdoc/syntax": errorLevelBasedOnEnv
  }
}
