/**
 * Field-Level Encryption Utility
 * 
 * Implements AES-256-GCM encryption for sensitive data (PII) before transmission to backend.
 * Provides both probabilistic encryption (for storage) and deterministic encryption (for search).
 * 
 * Features:
 * - AES-256-GCM encryption (authenticated encryption)
 * - Automatic key derivation from environment variables
 * - Deterministic encryption for searchable fields (email lookups)
 * - Hash-based indexing for exact match searches
 * - Performance optimized (< 10ms per operation)
 */

// Encryption key from environment (must be 32 bytes for AES-256)
const getEncryptionKey = (): Uint8Array => {
  const keyString = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY;
  
  if (!keyString) {
    throw new Error(
      'ENCRYPTION_KEY environment variable is required. Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    );
  }

  // Convert hex string to Uint8Array
  if (keyString.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
  }

  return new Uint8Array(Buffer.from(keyString, 'hex'));
};

// Derive a deterministic encryption key for searchable fields
const getDeterministicKey = (): Uint8Array => {
  const keyString = process.env.NEXT_PUBLIC_DETERMINISTIC_KEY || process.env.DETERMINISTIC_KEY;
  
  if (!keyString) {
    throw new Error(
      'DETERMINISTIC_KEY environment variable is required for searchable encryption.'
    );
  }

  if (keyString.length !== 64) {
    throw new Error('DETERMINISTIC_KEY must be 64 hex characters (32 bytes)');
  }

  return new Uint8Array(Buffer.from(keyString, 'hex'));
};

/**
 * Encrypt data using AES-256-GCM (probabilistic - different ciphertext each time)
 * Use this for fields that don't need to be searched.
 * 
 * @param plaintext - The data to encrypt
 * @returns Encrypted data as base64 string (IV + Auth Tag + Ciphertext)
 */
export const encrypt = async (plaintext: string): Promise<string> => {
  const key = getEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes IV for GCM
  
  const encodedPlaintext = new TextEncoder().encode(plaintext);
  
  // Use Web Crypto API for AES-256-GCM
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encodedPlaintext
  );
  
  // Combine IV (12 bytes) + Auth Tag (16 bytes, appended by Web Crypto) + Ciphertext
  const encryptedArray = new Uint8Array(encrypted);
  const result = new Uint8Array(iv.length + encryptedArray.length);
  result.set(iv, 0);
  result.set(encryptedArray, iv.length);
  
  return Buffer.from(result).toString('base64');
};

/**
 * Decrypt data encrypted with AES-256-GCM
 * 
 * @param ciphertext - Base64 encoded encrypted data (IV + Auth Tag + Ciphertext)
 * @returns Decrypted plaintext string
 */
export const decrypt = async (ciphertext: string): Promise<string> => {
  const key = getEncryptionKey();
  const data = Buffer.from(ciphertext, 'base64');
  
  // Extract IV (first 12 bytes) and encrypted content (rest)
  const iv = data.slice(0, 12);
  const encrypted = data.slice(12);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encrypted
  );
  
  return new TextDecoder().decode(decrypted);
};

/**
 * Deterministic encryption for searchable fields (e.g., email lookups)
 * Uses a fixed IV derived from the plaintext to ensure same input = same output
 * 
 * WARNING: Less secure than probabilistic encryption. Use only when searchability is required.
 * 
 * @param plaintext - The data to encrypt deterministically
 * @returns Encrypted data as base64 string
 */
export const encryptDeterministic = async (plaintext: string): Promise<string> => {
  const key = getDeterministicKey();
  
  // Derive deterministic IV from plaintext using HMAC-SHA256
  const hmacKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const hmacResult = await crypto.subtle.sign(
    'HMAC',
    hmacKey,
    new TextEncoder().encode(plaintext)
  );
  
  // Use first 12 bytes of HMAC as IV
  const iv = new Uint8Array(hmacResult).slice(0, 12);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    new TextEncoder().encode(plaintext)
  );
  
  const encryptedArray = new Uint8Array(encrypted);
  const result = new Uint8Array(iv.length + encryptedArray.length);
  result.set(iv, 0);
  result.set(encryptedArray, iv.length);
  
  return Buffer.from(result).toString('base64');
};

/**
 * Create a searchable hash for exact match lookups
 * Uses HMAC-SHA256 to create a deterministic hash
 * 
 * @param plaintext - The data to hash (e.g., email address)
 * @returns Hex-encoded hash string for indexing
 */
export const createSearchHash = async (plaintext: string): Promise<string> => {
  const key = getDeterministicKey();
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const hmacResult = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    new TextEncoder().encode(plaintext.toLowerCase().trim())
  );
  
  return Buffer.from(hmacResult).toString('hex');
};

/**
 * Encrypt an object's sensitive fields
 * 
 * @param data - Object containing sensitive fields
 * @param fields - Array of field names to encrypt
 * @returns Object with specified fields encrypted
 */
export const encryptFields = async (
  data: Record<string, any>,
  fields: string[]
): Promise<Record<string, any>> => {
  const encrypted = { ...data };
  
  for (const field of fields) {
    if (data[field] !== undefined && data[field] !== null) {
      encrypted[field] = await encrypt(String(data[field]));
    }
  }
  
  return encrypted;
};

/**
 * Decrypt an object's sensitive fields
 * 
 * @param data - Object containing encrypted fields
 * @param fields - Array of field names to decrypt
 * @returns Object with specified fields decrypted
 */
export const decryptFields = async (
  data: Record<string, any>,
  fields: string[]
): Promise<Record<string, any>> => {
  const decrypted = { ...data };
  
  for (const field of fields) {
    if (data[field] !== undefined && data[field] !== null) {
      decrypted[field] = await decrypt(data[field]);
    }
  }
  
  return decrypted;
};

/**
 * Encrypt PII (Personally Identifiable Information) in user data
 * Automatically encrypts common PII fields
 * 
 * @param userData - User object with PII fields
 * @returns User object with PII encrypted
 */
export const encryptPII = async (userData: Record<string, any>): Promise<Record<string, any>> => {
  const piiFields = [
    'email',
    'phone',
    'address',
    'dateOfBirth',
    'ssn',
    'taxId',
    'firstName',
    'lastName',
    'fullName',
  ];
  
  return encryptFields(userData, piiFields);
};

/**
 * Decrypt PII (Personally Identifiable Information) in user data
 * 
 * @param userData - User object with encrypted PII fields
 * @returns User object with PII decrypted
 */
export const decryptPII = async (userData: Record<string, any>): Promise<Record<string, any>> => {
  const piiFields = [
    'email',
    'phone',
    'address',
    'dateOfBirth',
    'ssn',
    'taxId',
    'firstName',
    'lastName',
    'fullName',
  ];
  
  return decryptFields(userData, piiFields);
};

/**
 * Validate encryption key format
 * 
 * @returns true if key is valid
 */
export const validateEncryptionKey = (): boolean => {
  try {
    const key = getEncryptionKey();
    return key.length === 32;
  } catch {
    return false;
  }
};

/**
 * Performance benchmark for encryption operations
 * 
 * @returns Average encryption time in milliseconds
 */
export const benchmarkEncryption = async (): Promise<number> => {
  const iterations = 100;
  const testPlaintext = 'test@example.com';
  
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    await encrypt(testPlaintext);
  }
  
  const end = performance.now();
  return (end - start) / iterations;
};

/**
 * Performance benchmark for decryption operations
 * 
 * @returns Average decryption time in milliseconds
 */
export const benchmarkDecryption = async (): Promise<number> => {
  const iterations = 100;
  const testPlaintext = 'test@example.com';
  const encrypted = await encrypt(testPlaintext);
  
  const start = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    await decrypt(encrypted);
  }
  
  const end = performance.now();
  return (end - start) / iterations;
};
