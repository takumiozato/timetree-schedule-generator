module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'react-hooks', 'react-refresh'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'argsIgnorePattern': '^_' // 変数名が _ で始まる場合はエラーを出さない
            }
        ]
    },
};
