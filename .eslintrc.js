module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react', 'react-native', 'react-hooks'],
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard',
    'standard-with-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      2,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/default-param-last': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    'import/order': 2,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'react/no-unescaped-entities': 0,
    'react-native/no-unused-styles': 2,
    'no-console': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    __DEV__: false,
    Request: false,
    fetch: false,
    FormData: false,
  },
}