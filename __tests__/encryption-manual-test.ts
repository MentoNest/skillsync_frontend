/**
 * Manual Encryption Test Script
 * 
 * Run with: npx tsx __tests__/encryption-manual-test.ts
 * 
 * This script tests all encryption functions without requiring a test framework.
 */

// Set test environment variables
process.env.ENCRYPTION_KEY = '0'.repeat(64);
process.env.DETERMINISTIC_KEY = '1'.repeat(64);

import {
  encrypt,
  decrypt,
  encryptDeterministic,
  createSearchHash,
  encryptFields,
  decryptFields,
  encryptPII,
  decryptPII,
  validateEncryptionKey,
  benchmarkEncryption,
  benchmarkDecryption,
} from '../lib/encryption';

const runTest = async (name: string, testFn: () => Promise<boolean>) => {
  try {
    const result = await testFn();
    if (result) {
      console.log(`✅ PASS: ${name}`);
    } else {
      console.log(`❌ FAIL: ${name}`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${name} - ${error instanceof Error ? error.message : error}`);
  }
};

const main = async () => {
  console.log('\n🔐 Running Encryption Tests...\n');

  // Test 1: Basic encrypt/decrypt
  await runTest('Encrypt and decrypt string', async () => {
    const plaintext = 'sensitive-data-123';
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    return decrypted === plaintext;
  });

  // Test 2: Probabilistic encryption
  await runTest('Different ciphertext for same plaintext', async () => {
    const plaintext = 'test@example.com';
    const encrypted1 = await encrypt(plaintext);
    const encrypted2 = await encrypt(plaintext);
    return encrypted1 !== encrypted2;
  });

  // Test 3: Deterministic encryption
  await runTest('Same ciphertext for deterministic encryption', async () => {
    const plaintext = 'user@example.com';
    const encrypted1 = await encryptDeterministic(plaintext);
    const encrypted2 = await encryptDeterministic(plaintext);
    return encrypted1 === encrypted2;
  });

  // Test 4: Search hash consistency
  await runTest('Search hash is consistent', async () => {
    const input = 'email@example.com';
    const hash1 = await createSearchHash(input);
    const hash2 = await createSearchHash(input);
    return hash1 === hash2;
  });

  // Test 5: Search hash case-insensitive
  await runTest('Search hash is case-insensitive', async () => {
    const hash1 = await createSearchHash('User@Example.com');
    const hash2 = await createSearchHash('user@example.com');
    return hash1 === hash2;
  });

  // Test 6: Encrypt fields
  await runTest('Encrypt specified fields', async () => {
    const data = { email: 'test@example.com', name: 'John', age: 30 };
    const encrypted = await encryptFields(data, ['email', 'name']);
    return encrypted.email !== data.email && 
           encrypted.name !== data.name && 
           encrypted.age === data.age;
  });

  // Test 7: Decrypt fields
  await runTest('Decrypt fields back to original', async () => {
    const data = { email: 'test@example.com', name: 'John' };
    const encrypted = await encryptFields(data, ['email', 'name']);
    const decrypted = await decryptFields(encrypted, ['email', 'name']);
    return decrypted.email === data.email && decrypted.name === data.name;
  });

  // Test 8: PII encryption
  await runTest('Encrypt PII fields', async () => {
    const userData = {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: 'admin',
    };
    const encrypted = await encryptPII(userData);
    return encrypted.email !== userData.email &&
           encrypted.firstName !== userData.firstName &&
           encrypted.role === userData.role;
  });

  // Test 9: PII decryption
  await runTest('Decrypt PII fields', async () => {
    const userData = {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };
    const encrypted = await encryptPII(userData);
    const decrypted = await decryptPII(encrypted);
    return decrypted.email === userData.email &&
           decrypted.firstName === userData.firstName &&
           decrypted.lastName === userData.lastName;
  });

  // Test 10: Validate encryption key
  await runTest('Validate encryption key', async () => {
    return validateEncryptionKey() === true;
  });

  // Test 11: Unicode support
  await runTest('Handle unicode characters', async () => {
    const plaintext = 'Hello 世界 🌍';
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    return decrypted === plaintext;
  });

  // Test 12: Empty string
  await runTest('Handle empty strings', async () => {
    const plaintext = '';
    const encrypted = await encrypt(plaintext);
    const decrypted = await decrypt(encrypted);
    return decrypted === plaintext;
  });

  // Performance tests
  console.log('\n⚡ Running Performance Tests...\n');

  await runTest('Encryption performance < 10ms', async () => {
    const avgTime = await benchmarkEncryption();
    console.log(`   Average encryption time: ${avgTime.toFixed(2)}ms`);
    return avgTime < 10;
  });

  await runTest('Decryption performance < 10ms', async () => {
    const avgTime = await benchmarkDecryption();
    console.log(`   Average decryption time: ${avgTime.toFixed(2)}ms`);
    return avgTime < 10;
  });

  console.log('\n✅ All tests completed!\n');
};

main().catch(console.error);
