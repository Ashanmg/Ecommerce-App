const prettierConfig = require('./.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:jsx-a11y/recommended', 'prettier'],
  plugins: ['jsx-a11y', 'prettier', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    semi: 1,
    'react/jsx-filename-extension': [0],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-extra-boolean-cast': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
