import baseConfig from "@kosmos/config/eslint/base";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
