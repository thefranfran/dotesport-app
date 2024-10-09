module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo']],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@env': './src/core/env.js',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
            '.png',
          ],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
