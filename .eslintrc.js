module.exports = {
  root: true,
  extends: '@react-native-community/eslint-config',
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'jest', 'import', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', 'ts', 'tsx', 'mdx'],
      },
    },
  },
};
