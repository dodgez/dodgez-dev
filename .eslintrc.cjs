// eslint-plugin-import doesn't support flat config yet: https://github.com/import-js/eslint-plugin-import/issues/2556
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:perfectionist/recommended-alphabetical-legacy',
  ],
  ignorePatterns: ['.eslintrc.cjs', 'dist', 'node_modules'],
  overrides: [
      {
          files: ["*.astro"],
          parser: "astro-eslint-parser",
          parserOptions: {
              parser: "@typescript-eslint/parser",
              extraFileExtensions: [".astro"],
          },
          rules: {
            'react/jsx-key': 'off',
            'react/no-unknown-property': 'off',
          },
      },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
          orderImportKind: 'asc',
        },
        groups: [
          ['builtin', 'external', 'internal'],
          ['sibling', 'parent'],
          ['index', 'unknown'],
        ],
        'newlines-between': 'always',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: ['@mui/icons-material', '@mui/material'],
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    'perfectionist/sort-imports': 0,
    'perfectionist/sort-intersection-types': [
      'error',
      {
        groups: [
          'conditional',
          'function',
          'import',
          'intersection',
          'keyword',
          'literal',
          'named',
          'operator',
          'tuple',
          'union',
          'object',
          'nullish',
          'unknown',
        ],
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        groups: [
          'conditional',
          'function',
          'import',
          'intersection',
          'keyword',
          'literal',
          'named',
          'operator',
          'tuple',
          'union',
          'object',
          'nullish',
          'unknown',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};