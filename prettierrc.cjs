/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  jsxSingleQuote: true,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
};
