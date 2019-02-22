'use strict';

module.exports = {
  collectCoverageFrom: [
    '**/packages/*/**/*.js',
    '**/packages/*/**/*.ts',
    '!**/bin/**',
    '!**/cli/**',
    '!**/perf/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/build/**',
    '!**/vendor/**',
    '!e2e/**',
  ],
  modulePathIgnorePatterns: [
    'docs/.*',
    'packages/.*/build',
    'packages/.*/build-es5'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '\\.snap$',
    '/packages/.*/build',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};