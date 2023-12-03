module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "quotes": ["error", "double"],
        "indent": ["error", 4],  // evil papu
        "key-spacing": ["error", { "afterColon": true }],
        "react/react-in-jsx-scope": "off",  // annoying
        "react/prop-types": "off",  // annoying too (for now)
    },
    // https://stackoverflow.com/questions/72780296
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
