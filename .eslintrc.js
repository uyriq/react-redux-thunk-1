module.exports = {
    env: {
        browser: true,
        es2021: true,
    },

    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'linebreak-style': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                tabWidth: 4,
            },
        ],
        // Indent with 4 spaces
        indent: ['off', 4],

        // Indent JSX with 4 spaces
        'react/jsx-indent': ['off', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['off', 4],
    },
}
