module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // Specify the correct path to your test files relative to the jest.config.js file
  testMatch: ['**/tests/**/*.ts'], // Adjust the path as needed
};