import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Path to the Next.js app so next.config.ts and .env files are loaded
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases matching tsconfig paths
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'components/community/**/*.{ts,tsx}',
    'app/(dashboard)/community/**/*.{ts,tsx}',
    'lib/community-types.ts',
    'lib/filters.ts',
    '!**/*.d.ts',
  ],
};

export default createJestConfig(config);
