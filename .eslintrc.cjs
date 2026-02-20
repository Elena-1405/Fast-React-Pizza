module.exports = {
  root: true,

  env: {
    browser: true,
    es2020: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: ['react-refresh'],

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'warn',
      // {
      //   singleQuote: true,
      //   jsxSingleQuote: true,
      //   semi: true,
      //   trailingComma: "es5",
      //   printWidth: 80,
      //   tabWidth: 2,
      //   plugins: ["prettier-plugin-tailwindcss"],
      //   tailwindConfig: "./tailwind.config.js",
      // },
    ],
  },
};
