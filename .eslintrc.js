module.exports = {
  extends: ["react-app", "airbnb", "eslint-config-with-prettier"],
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  rules: {
    "indent": "off",
    "radix": "off",
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "no-tabs": "off",
    "comma-dangle": "off",
    "function-paren-newline": "off",
    "eol-last": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "global-require": "off",
    "prefer-template": "off",
    "max-len": "off",
    "arrow-parens": "off",
    "no-confusing-arrow": "off",
    "arrow-body-style": "off",
    "class-methods-use-this": "off",
    "no-shadow": ["error", {"allow": ["push", "goBack", "fields"]}],
    "import/newline-after-import": "off",
    "import/no-named-as-default": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "jsx-a11y/label-has-for": [ 2, {
      "required": {
        "some": [ "nesting", "id" ]
      }
    }],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": "off",
    
    "react/sort-comp": "off",
    "react/style-prop-object": "off",
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",
    "react/forbid-prop-types": "off",
    "react/prop-types": "off",
    "react/no-typos": "off",
    "react/require-default-props": "off",
    // had to set this because of updates to react lifecycle methods mean the recommended
    // approach to getting data is now to request it in componentDidMount; see
    // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    "react/no-did-mount-set-state": "off",
  }
};
