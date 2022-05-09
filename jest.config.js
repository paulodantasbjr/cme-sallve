/* eslint-disable no-undef */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jestSetup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '((\\.|/*.)(test))\\.[tj]sx?$',
  moduleDirectories: ['node_modules', './src'],
  coverageDirectory: 'coverage',
  coverageReporters: ['cobertura', 'html', 'lcov', 'text-summary', 'text'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/main.tsx',
    '!src/**/*.types.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      lines: 10,
      functions: 10,
      statements: 10,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|svg|gif)$': '<rootDir>/config/mocks/fileMock.ts',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: './coverage/',
        outputName: 'junit.xml',
        classNameTemplate: '{classname} - {title}',
        titleTemplate: '{classname} - {title}',
        ancestorSeparator: ' > ',
        usePathForSuiteName: 'true',
      },
    ],
  ],
  preset: 'ts-jest',
  coverageProvider: 'v8',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
