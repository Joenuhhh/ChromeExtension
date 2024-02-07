module.exports = {
  // Specify the test environment
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  // Specify the pattern for test files
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  moduleNameMapper: {
      '^chrome$': '<rootDir>/__mocks__/chrome.js',
  },
};
