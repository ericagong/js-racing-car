import js from '@eslint/js';
import globals from 'globals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import jestPlugin from 'eslint-plugin-jest';
import importX from 'eslint-plugin-import-x';

export default [
  js.configs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      'import-x': importX,
    },
    rules: {
      'prettier/prettier': 'error',
      'import-x/no-cycle': ['error', { maxDepth: 1 }],
      'no-var': 'error',
      eqeqeq: 'warn',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.test.js', '**/__tests__/**/*.js'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
