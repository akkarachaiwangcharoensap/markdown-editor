export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/__tests__'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.ts'
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '^react-syntax-highlighter$': '<rootDir>/__mocks__/react-syntax-highlighter.js',
        '^react-syntax-highlighter/dist/esm/styles/prism$': '<rootDir>/__mocks__/prism-styles.js'
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: {
                    jsx: 'react-jsx',
                    esModuleInterop: true,
                    allowSyntheticDefaultImports: true
                }
            }
        ]
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@testing-library|react-markdown|remark-.*|rehype-.*|unified|bail|is-plain-obj|trough|vfile|unist-.*|micromark.*|decode-named-character-reference|character-entities|property-information|hast-util-.*|space-separated-tokens|comma-separated-tokens|ccount|escape-string-regexp|markdown-table)/)'
    ],
    testTimeout: 10000
};