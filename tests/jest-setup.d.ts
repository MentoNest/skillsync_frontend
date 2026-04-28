/// <reference types="jest" />

declare module '*.test.ts' {
  const tests: any;
  export = tests;
}
