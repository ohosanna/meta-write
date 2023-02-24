module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2017,
    sourceType: "module",
  },
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // 设置默认eslint规则
    "comma-dangle": ["error", "always-multiline"],
    "no-console": 0,
    "no-extra-semi": 2,
    "no-mixed-spaces-and-tabs": 0,
    "no-multiple-empty-lines": 2,
    "no-new": 0,
    "no-tabs": 0,
    "one-var": 0,
    semi: [1, "never"],
    "space-before-function-paren": 0,
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    '@typescript-eslint/ban-types': 0,
    "@typescript-eslint/explicit-function-return-type": 0,
  },
}