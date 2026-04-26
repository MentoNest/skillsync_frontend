module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
    }],
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^uuid$': '<rootDir>/tests/__mocks__/uuid.ts',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
