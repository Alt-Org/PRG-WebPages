// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@stylistic': stylistic,
      react,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',

      '@stylistic/padding-line-between-statements': [
        'warn',
        {
          blankLine: 'never',
          prev: ['cjs-import', 'directive', 'import'],
          next: ['import', 'cjs-import'],
        },
        {
          blankLine: 'always',
          prev: ['cjs-import', 'import'],
          next: ['export'],
        },
        { blankLine: 'always', prev: '*', next: ['type', 'interface'] },
        { blankLine: 'always', prev: ['type', 'interface'], next: '*' },
      ],
      '@stylistic/jsx-self-closing-comp': ['error', { component: true }],

      'jsx-a11y/anchor-is-valid': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react/no-unescaped-entities': 0,
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-key': 'error',
      'react/prop-types': 'off',
      'react/jsx-no-duplicate-props': 'error',
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-no-target-blank': 'error',

      eqeqeq: ['error', 'always'],
      complexity: ['warn', { max: 10 }],
      'max-params': ['error', 5],
      'max-depth': ['error', { max: 3 }],
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-duplicate-case': 'error',
      'no-self-compare': 'error',
      'prefer-const': 'error',
      'array-callback-return': 'error',
      'id-length': [
        'warn',
        {
          min: 2,
          exceptions: ['i', 'j', 'x', 'y', 'z', 't', 'a', 'b', '_'],
        },
      ],
      yoda: ['error', 'never'],
      'require-await': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'import/no-duplicates': 'error',
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 0,
    },
  },
  {
    files: ['src/widgets/Navbar/**/NavbarBuilder.{ts,tsx}'],
    rules: {
      'max-params': ['warn', 4],
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'require-await': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
  {
    files: ['jest.setup.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/display-name': 'off',
    },
  },

  prettierConfig,
];

export default eslintConfig;
