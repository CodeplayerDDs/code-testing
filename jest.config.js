/*
 * @Author: your name
 * @Date: 2021-11-01 13:47:44
 * @LastEditTime: 2021-11-03 09:44:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code-testing\jest.config.js
 */
module.exports = {
  // u can change this option to a more specific folder for test single component or util when dev
  // for example, ['<rootDir>/packages/components/button']
  roots: ['<rootDir>/src/'],
  setupFiles: ['<rootDir>/jest.setup.js'],

  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: true,
              },
            },
          ],
          [
            '@vue/babel-preset-jsx',
            {
              compositionAPI: true,
              injectH: true,
            },
          ],

          '@babel/preset-typescript',
        ],
        plugins: [
          // 'transform-vue-jsx',
          // ["@babel/plugin-proposal-decorators", { "legacy": true }]
        ],
      },
    ],
  },
  globals: {
    __DEV__: true,
  },
  moduleNameMapper: {
    '^@tests': '<rootDir>/tests',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/tests'],
  reporters: ['default', 'jest-junit'],
}
