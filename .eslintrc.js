module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
        commonjs: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react-hooks', 'react', '@typescript-eslint'],
    rules: {
        // TypeScirpt なので prop-types は要らない
        'react/prop-types': 'off',
    },
}
