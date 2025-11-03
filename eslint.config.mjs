import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
    baseDirectory: process.cwd(),
    recommendedConfig: js.configs.recommended,
});

export default  [
    {
        ignores: ["**/node_modules/", "dist/", "coverage/"],
    },
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ),
    {
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.jest,
                ...globals.es6,
            },
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double", { allowTemplateLiterals: true }],
            semi: ["error", "always"],
            "no-unused-vars": "off",
            "padded-blocks": "off",
            "@typescript-eslint/no-explicit-any": "error",
        },
    },
    {
        files: ["*.test.ts"],
        rules: {
            "no-unused-expressions": "off",
        },
    },
];
