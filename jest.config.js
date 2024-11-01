module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // To handle 'src' alias if you use it
  },
  transform: {
    '^.+\\.ts$': 'ts-jest', // This tells Jest to use ts-jest for .ts files
  },
};
