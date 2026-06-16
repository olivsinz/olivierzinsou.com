import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'valid-typeof': 'warn',
      eqeqeq: 'warn',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      'vue/multi-word-component-names': 0,
      'vue/no-unused-properties': [
        'error',
        {
          groups: ['props', 'data', 'methods', 'computed'],
          deepData: true,
          ignorePublicMembers: false,
        },
      ],
    },
  },
  {
    ignores: ['public/*', 'dist/*', 'node_modules/*'],
  },
];
