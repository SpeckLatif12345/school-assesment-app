import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    plugins: {
      js,
      react: pluginReact,
      "unused-imports": unusedImports,
    },

    extends: ["js/recommended", pluginReact.configs.flat.recommended],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",

      "unused-imports/no-unused-imports": "error",

      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // React version setting
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
