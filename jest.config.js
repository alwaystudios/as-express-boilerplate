module.exports = {
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: false,
  coverageReporters: ['json', 'html', 'text'],
  coverageDirectory: 'coverage',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts)$',
  coveragePathIgnorePatterns: ['<rootDir>/test/', '<rootDir>/node_modules'],
  moduleFileExtensions: ['ts', 'js', 'json'],
}
