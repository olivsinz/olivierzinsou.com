module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "valid-typeof": "warn",
    eqeqeq: "warn",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "vue/multi-word-component-names": 0,
    "vue/no-unused-properties": [
      "error",
      {
        groups: ["props", "data", "methods", "computed"],
        deepData: true,
        ignorePublicMembers: false,
      },
    ],
  },
};
