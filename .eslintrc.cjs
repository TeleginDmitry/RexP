/*eslint-env node*/

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb-typescript", "prettier", "next/core-web-vitals"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: true,
    },
    project: ["tsconfig.eslint.json"],
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
    "import/ignore": ["node_modules"],
    react: {
      version: "detect",
      linkComponents: [
        {
          name: "Link",
          linkAttribute: "to",
        },
      ],
    },
  },
  rules: {
    curly: ["warn", "all"],
    ///

    "@typescript-eslint/ban-types": [
      "warn",
      {
        types: {
          "{}": false,
        },
      },
    ],
    "@typescript-eslint/consistent-generic-constructors": ["warn", "constructor"],
    "@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
    "@typescript-eslint/no-explicit-any": [
      "warn",
      {
        ignoreRestArgs: true,
      },
    ],
    "@typescript-eslint/consistent-type-exports": [
      "warn",
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        fixStyle: "separate-type-imports",
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      {
        overrides: {
          constructors: "no-public",
        },
      },
    ],
    "@typescript-eslint/member-ordering": ["warn"],
    "@typescript-eslint/method-signature-style": ["warn", "property"],
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-confusing-void-expression": [
      "warn",
      {
        ignoreArrowShorthand: true,
      },
    ],
    "@typescript-eslint/no-duplicate-enum-values": "warn",
    "@typescript-eslint/no-invalid-void-type": "warn",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
    "@typescript-eslint/array-type": [
      "warn",
      {
        default: "array-simple",
      },
    ],
    "@typescript-eslint/no-redundant-type-constituents": "warn",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-useless-empty-export": "warn",
    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-literal-enum-member": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/sort-type-constituents": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "@typescript-eslint/unified-signatures": "warn",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    ///

    "react/self-closing-comp": "warn",
    "react/destructuring-assignment": [
      "warn",
      "always",
      {
        destructureInSignature: "always",
      },
    ],
    "react/jsx-boolean-value": "warn",
    "react/jsx-curly-brace-presence": "warn",
    "react/jsx-fragments": "warn",
    "react/jsx-filename-extension": [
      "warn",
      {
        allow: "as-needed",
        extensions: [".tsx", ".jsx"],
      },
    ],
    "react/jsx-no-constructed-context-values": "warn",
    "react/jsx-no-useless-fragment": [
      "warn",
      {
        allowExpressions: true,
      },
    ],
    "react/jsx-pascal-case": [
      "warn",
      {
        allowAllCaps: true,
      },
    ],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/style-prop-object": "warn",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    ///

    "no-restricted-syntax": ["error", "FunctionExpression", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "no-irregular-whitespace": "off",
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
    "no-console": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    ///

    "import/prefer-default-export": "off",
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^virtual:"],
      },
    ],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", ["sibling", "index"], "parent"],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "*.+(scss|css)",
            patternOptions: {
              matchBase: true,
            },
            group: "parent",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
};
