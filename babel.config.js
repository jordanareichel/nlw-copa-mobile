module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['inline-dotenv'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
        include: ['NODE_ENV'],
      },
      'transform-inline-environment-variables',
    ],
  ],
};
