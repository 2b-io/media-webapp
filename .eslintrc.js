module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    "jsx-a11y",
    "promise",
    "react",
    "security"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:security/recommended"
  ],
  // "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module",
    "ecmaVersion": 2018
  },
  "rules": {
    "react/display-name": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-curly-spacing": [
      2, {
        "when": "always",
        "allowMultiline": false
    }],
    "react/jsx-equals-spacing": [
      2,
      "never"
    ],
    "react/jsx-pascal-case": [
      2, {
        "allowAllCaps": false
      }
    ],
    "react/jsx-tag-spacing": [
      2, {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never"
      }
    ],
    "react/prop-types": "off",
    "indent": [
      "error",
      2, {
        "SwitchCase": 1,
        "ignoredNodes": [
          "TemplateLiteral"
        ]
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-console": [
      "warn"
    ],
    "object-curly-spacing": [
      "error",
      "always", {
        "arraysInObjects": true,
        "arraysInObjects": true,
        "objectsInObjects": true,
        "objectsInObjects": true
      }
    ],
    "array-bracket-spacing": [
      "error",
      "always"
    ],
    "key-spacing": "error",
    "block-spacing": [
      "error",
      "always"
    ],
    "comma-spacing": "error",
    "template-tag-spacing": [
      "error",
      "never"
    ],
    "object-shorthand": "error",
    "security/detect-object-injection": "off"
  }
};
