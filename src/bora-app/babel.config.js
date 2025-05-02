module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: true,
    }],
    ['@babel/plugin-transform-private-methods', {
      loose: true,
    }],
  ],
};
