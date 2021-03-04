module.exports = {
  'extends': ['taro/react'],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": [1, {
      "varsIgnorePattern": "Taro"
    }],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx", ".tsx"]
    }],
    "semi": 0,
    "react/no-multi-comp": 0,
    "import/prefer-default-export": 0,
    "react/sort-comp": 0,
    "jsx-quotes": 0
  },
}
