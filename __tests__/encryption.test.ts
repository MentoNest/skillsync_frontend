/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, vi } from 'vitest';
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
} from '@/lib/encryption';

// Set up test encryption keys
const TEST_ENCRYPTION_KEY = '0'.repeat(64); // 32 bytes in hex
const TEST_DETERMINISTIC_KEY = '1'.repeat(64);

beforeAll(() => {
  // Mock environment variables for testing
  vi.stubEnv('ENCRYPTION_KEY', TEST_ENCRYPTION_KEY);
  vi.stubEnv('DETERMINISTIC_KEY', TEST_DETERMINISTIC_KEY);
});

describe('Encryption Utilities', () => {
  describe('encrypt/decrypt', () => {
    it('should encrypt and decrypt a string successfully', async () => {
      const plaintext = 'sensitive-data-123';
      const encrypted = await encrypt(plaintext);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should produce different ciphertext for same plaintext (probabilistic)', async () => {
      const plaintext = 'test@example.com';
      const encrypted1 = await encrypt(plaintext);
      const encrypted2 = await encrypt(plaintext);

      expect(encrypted1).not.toBe(encrypted2);
    });

    it('should handle empty strings', async () => {
      const plaintext = '';
      const encrypted = await encrypt(plaintext);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should handle unicode characters', async () => {
      const plaintext = 'Hello 世界 🌍';
      const encrypted = await encrypt(plaintext);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should handle long strings', async () => {
      const plaintext = 'a'.repeat(10000);
      const encrypted = await encrypt(plaintext);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it('should fail decryption with wrong ciphertext', async () => {
      const encrypted = await encrypt('test-data');
      const tamperedCiphertext = encrypted.slice(0, -1) + '0';

      await expect(decrypt(tamperedCiphertext)).rejects.toThrow();
    });
  });

  describe('encryptDeterministic', () => {
    it('should produce same ciphertext for same plaintext', async () => {
      const plaintext = 'user@example.com';
      const encrypted1 = await encryptDeterministic(plaintext);
      const encrypted2 = await encryptDeterministic(plaintext);

      expect(encrypted1).toBe(encrypted2);
    });

    it('should produce different ciphertext for different plaintext', async () => {
      const encrypted1 = await encryptDeterministic('user1@example.com');
      const encrypted2 = await encryptDeterministic('user2@example.com');

      expect(encrypted1).not.toBe(encrypted2);
    });

    it('should be decryptable with standard decrypt', async () => {
      const plaintext = 'test@example.com';
      const encrypted = await encryptDeterministic(plaintext);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });
  });

  describe('createSearchHash', () => {
    it('should produce same hash for same input', async () => {
      const input = 'email@example.com';
      const hash1 = await createSearchHash(input);
      const hash2 = await createSearchHash(input);

      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different inputs', async () => {
      const hash1 = await createSearchHash('email1@example.com');
      const hash2 = await createSearchHash('email2@example.com');

      expect(hash1).not.toBe(hash2);
    });

    it('should be case-insensitive', async () => {
      const hash1 = await createSearchHash('User@Example.com');
      const hash2 = await createSearchHash('user@example.com');

      expect(hash1).toBe(hash2);
    });

    it('should trim whitespace', async () => {
      const hash1 = await createSearchHash('  user@example.com  ');
      const hash2 = await createSearchHash('user@example.com');

      expect(hash1).toBe(hash2);
    });

    it('should produce hex string output', async () => {
      const hash = await createSearchHash('test@example.com');
      expect(hash).toMatch(/^[0-9a-f]+$/);
    });

    it('should produce 64 character hash (256 bits)', async () => {
      const hash = await createSearchHash('test@example.com');
      expect(hash.length).toBe(64);
    });
  });

  describe('encryptFields/decryptFields', () => {
    it('should encrypt specified fields', async () => {
      const data = {
        email: 'test@example.com',
        name: 'John Doe',
        age: 30,
      };

      const encrypted = await encryptFields(data, ['email', 'name']);

      expect(encrypted.email).not.toBe(data.email);
      expect(encrypted.name).not.toBe(data.name);
      expect(encrypted.age).toBe(data.age);
    });

    it('should decrypt specified fields', async () => {
      const data = {
        email: 'test@example.com',
        name: 'John Doe',
      };

      const encrypted = await encryptFields(data, ['email', 'name']);
      const decrypted = await decryptFields(encrypted, ['email', 'name']);

      expect(decrypted.email).toBe(data.email);
      expect(decrypted.name).toBe(data.name);
    });

    it('should handle undefined/null fields gracefully', async () => {
      const data = {
        email: 'test@example.com',
        phone: null,
        address: undefined,
      };

      const encrypted = await encryptFields(data, ['email', 'phone', 'address']);

      expect(encrypted.email).toBeDefined();
      expect(encrypted.phone).toBeNull();
      expect(encrypted.address).toBeUndefined();
    });
  });

  describe('encryptPII/decryptPII', () => {
    it('should encrypt common PII fields', async () => {
      const userData = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        address: '123 Main St',
        dateOfBirth: '1990-01-01',
      };

      const encrypted = await encryptPII(userData);

      expect(encrypted.email).not.toBe(userData.email);
      expect(encrypted.firstName).not.toBe(userData.firstName);
      expect(encrypted.lastName).not.toBe(userData.lastName);
      expect(encrypted.phone).not.toBe(userData.phone);
    });

    it('should decrypt PII fields back to original', async () => {
      const userData = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
      };

      const encrypted = await encryptPII(userData);
      const decrypted = await decryptPII(encrypted);

      expect(decrypted.email).toBe(userData.email);
      expect(decrypted.firstName).toBe(userData.firstName);
      expect(decrypted.lastName).toBe(userData.lastName);
      expect(decrypted.phone).toBe(userData.phone);
    });

    it('should not encrypt non-PII fields', async () => {
      const userData = {
        email: 'user@example.com',
        role: 'admin',
        isActive: true,
      };

      const encrypted = await encryptPII(userData);

      expect(encrypted.email).not.toBe(userData.email);
      expect(encrypted.role).toBe(userData.role);
      expect(encrypted.isActive).toBe(userData.isActive);
    });
  });

  describe('validateEncryptionKey', () => {
    it('should return true for valid key', () => {
      vi.stubEnv('ENCRYPTION_KEY', '0'.repeat(64));
      expect(validateEncryptionKey()).toBe(true);
    });

    it('should return false for missing key', () => {
      vi.stubEnv('ENCRYPTION_KEY', '');
      expect(validateEncryptionKey()).toBe(false);
    });

    it('should return false for invalid key length', () => {
      vi.stubEnv('ENCRYPTION_KEY', 'short-key');
      expect(validateEncryptionKey()).toBe(false);
    });
  });

  describe('performance', () => {
    it('should encrypt in less than 10ms on average', async () => {
      const avgTime = await benchmarkEncryption();
      expect(avgTime).toBeLessThan(10);
    }, 30000); // 30s timeout for 100 iterations

    it('should decrypt in less than 10ms on average', async () => {
      const avgTime = await benchmarkDecryption();
      expect(avgTime).toBeLessThan(10);
    }, 30000);
  });

  describe('error handling', () => {
    it('should throw error when encryption key is missing', async () => {
      vi.stubEnv('ENCRYPTION_KEY', '');
      await expect(encrypt('test')).rejects.toThrow('ENCRYPTION_KEY');
    });

    it('should throw error when encryption key is wrong length', async () => {
      vi.stubEnv('ENCRYPTION_KEY', 'invalid-key');
      await expect(encrypt('test')).rejects.toThrow('ENCRYPTION_KEY');
    });

    it('should throw error when deterministic key is missing', async () => {
      vi.stubEnv('DETERMINISTIC_KEY', '');
      await expect(encryptDeterministic('test')).rejects.toThrow('DETERMINISTIC_KEY');
    });
  });

  describe('security', () => {
    it('should include authentication tag (GCM)', async () => {
      const encrypted = await encrypt('test-data');
      const decoded = Buffer.from(encrypted, 'base64');
      
      // IV (12) + Ciphertext + Auth Tag (16)
      expect(decoded.length).toBeGreaterThan(28);
    });

    it('should use 12-byte IV', async () => {
      const encrypted = await encrypt('test-data');
      const decoded = Buffer.from(encrypted, 'base64');
      
      // First 12 bytes should be IV
      expect(decoded.length).toBeGreaterThan(12);
    });

    it('should not leak plaintext in ciphertext', async () => {
      const plaintext = 'super-secret-password-123';
      const encrypted = await encrypt(plaintext);
      
      expect(encrypted).not.toContain(plaintext);
      expect(Buffer.from(encrypted, 'base64').toString('utf-8')).not.toContain(plaintext);
    });
  });
});
