import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importX from "eslint-plugin-import-x";

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import-x": importX,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /* JavaScript */
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "no-undef": "error",

      /* React */
      "react/jsx-uses-vars": "error",

      "react/jsx-no-undef": [
        "error",
        {
          allowGlobals: false,
        },
      ],

      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      /* Hooks */
      ...reactHooks.configs.recommended.rules,

      /* React Refresh */
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      /* Imports */
      "import-x/no-unresolved": "off",
      "import-x/named": "error",
      "import-x/default": "error",
      "import-x/no-duplicates": "error",

      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
        },
      ],
    },
  },
];