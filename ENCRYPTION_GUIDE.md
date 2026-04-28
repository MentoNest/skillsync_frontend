# SkillSync Frontend Encryption System

## Overview

Field-level encryption system for protecting sensitive data (PII) before transmission to the backend API. Implements AES-256-GCM encryption with support for both probabilistic and deterministic encryption.

## Features

✅ **AES-256-GCM Encryption** - Industry-standard authenticated encryption  
✅ **Probabilistic Encryption** - Different ciphertext each time (for storage)  
✅ **Deterministic Encryption** - Same ciphertext for same input (for search)  
✅ **Search Hashes** - HMAC-SHA256 for indexed exact-match lookups  
✅ **Automatic PII Detection** - Encrypts common PII fields automatically  
✅ **Performance Optimized** - < 10ms per operation  
✅ **TypeScript Support** - Full type safety  

## Installation & Setup

### 1. Generate Encryption Keys

```bash
# Generate primary encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate deterministic encryption key (for searchable fields)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Configure Environment Variables

Create a `.env.local` file:

```env
ENCRYPTION_KEY=<your-64-char-hex-key>
DETERMINISTIC_KEY=<your-64-char-hex-key>
```

**Security Notes:**
- Never commit real keys to version control
- Use different keys for dev/staging/production
- Rotate keys regularly
- In production, consider using AWS KMS or Azure Key Vault

## Usage Examples

### Basic Encryption/Decryption

```typescript
import { encrypt, decrypt } from '@/lib/encryption';

// Encrypt sensitive data
const encrypted = await encrypt('user@example.com');
// Output: "base64-encoded-ciphertext"

// Decrypt data
const decrypted = await decrypt(encrypted);
// Output: "user@example.com"
```

### Using React Hooks

```typescript
import { useEncryption, usePIIEncryption } from '@/hooks/useEncryption';

function RegistrationForm() {
  const { encryptValue, decryptValue } = useEncryption();
  
  const handleSubmit = async (formData) => {
    const encryptedEmail = await encryptValue(formData.email);
    // Send encryptedEmail to API
  };
  
  // ...
}
```

### Encrypting User PII

```typescript
import { encryptPII, decryptPII } from '@/lib/encryption';

const userData = {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  role: 'admin', // Not encrypted (not PII)
};

// Encrypt all PII fields
const encrypted = await encryptPII(userData);
// email, firstName, lastName, phone are now encrypted
// role remains unchanged

// Decrypt PII fields
const decrypted = await decryptPII(encrypted);
// All PII fields restored to plaintext
```

### Deterministic Encryption (for Search)

```typescript
import { encryptDeterministic, createSearchHash } from '@/lib/encryption';

// Encrypt email for storage (searchable)
const encryptedEmail = await encryptDeterministic('user@example.com');
// Same email always produces same ciphertext

// Create hash for email lookup
const emailHash = await createSearchHash('user@example.com');
// Use this hash to search database index
```

### Encrypted API Requests

```typescript
import { encryptedPost, registerUser, searchUserByEmail } from '@/lib/encryptedApi';

// Manual encrypted request
const result = await encryptedPost('/api/users', {
  email: 'user@example.com',
  name: 'John Doe',
  age: 30,
}, {
  encryptFields: ['email', 'name'], // Encrypt these fields
  decryptPII: true, // Decrypt PII in response
});

// Pre-built registration helper
const user = await registerUser({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'secure-password',
});

// Search by email (uses hash)
const foundUser = await searchUserByEmail('user@example.com');
```

### Using Encrypted Form Hook

```typescript
import { useEncryptedForm } from '@/hooks/useEncryption';

function UserForm() {
  const {
    data,
    encryptedData,
    updateField,
    encryptAll,
    isLoading,
  } = useEncryptedForm({
    email: '',
    firstName: '',
    lastName: '',
  });
  
  const handleSubmit = async () => {
    const encrypted = await encryptAll(['email', 'firstName', 'lastName']);
    // Send encrypted data to API
  };
  
  // ...
}
```

## API Reference

### Core Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `encrypt(plaintext)` | Probabilistic AES-256-GCM encryption | `Promise<string>` |
| `decrypt(ciphertext)` | Decrypt AES-256-GCM ciphertext | `Promise<string>` |
| `encryptDeterministic(plaintext)` | Deterministic encryption for search | `Promise<string>` |
| `createSearchHash(plaintext)` | Create HMAC-SHA256 hash for indexing | `Promise<string>` |
| `encryptFields(data, fields)` | Encrypt specific fields in object | `Promise<object>` |
| `decryptFields(data, fields)` | Decrypt specific fields in object | `Promise<object>` |
| `encryptPII(userData)` | Encrypt all PII fields | `Promise<object>` |
| `decryptPII(userData)` | Decrypt all PII fields | `Promise<object>` |

### React Hooks

| Hook | Description |
|------|-------------|
| `useEncryption()` | Basic encryption/decryption operations |
| `usePIIEncryption()` | PII-specific encryption/decryption |
| `useEncryptedForm<T>()` | Form field encryption management |

### API Helpers

| Function | Description |
|----------|-------------|
| `encryptedPost(url, data, config)` | POST with auto-encryption |
| `encryptedPut(url, data, config)` | PUT/PATCH with auto-encryption |
| `encryptedSearch(url, term, field)` | Search using encrypted hash |
| `registerUser(userData)` | Encrypted user registration |
| `updateUserProfile(id, data)` | Encrypted profile update |
| `searchUserByEmail(email)` | Search user by email hash |

## PII Fields (Auto-Encrypted)

The following fields are automatically encrypted by `encryptPII()`:

- `email`
- `phone`
- `address`
- `dateOfBirth`
- `ssn`
- `taxId`
- `firstName`
- `lastName`
- `fullName`

## Performance

- **Encryption**: ~5-8ms per operation
- **Decryption**: ~3-5ms per operation
- **Hash Creation**: ~2-3ms per operation
- **Benchmark**: Run `npx tsx __tests__/encryption-manual-test.ts`

## Security

### Encryption Details

- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Key Size**: 256 bits (32 bytes)
- **IV Size**: 96 bits (12 bytes)
- **Auth Tag**: 128 bits (16 bytes)
- **Hash**: HMAC-SHA256 for deterministic operations

### Best Practices

1. ✅ Always encrypt PII before sending to API
2. ✅ Use probabilistic encryption for storage
3. ✅ Use deterministic encryption only when search is needed
4. ✅ Never log or expose encrypted data
5. ✅ Rotate encryption keys regularly
6. ✅ Use different keys per environment
7. ✅ Validate encryption keys on app startup

### Key Rotation

1. Generate new encryption key
2. Deploy app with both old and new keys
3. Decrypt all data with old key
4. Re-encrypt all data with new key
5. Update environment variable
6. Remove old key support
7. Verify decryption works

## Testing

Run manual tests:

```bash
# Set test keys
export ENCRYPTION_KEY=$(node -e "console.log('0'.repeat(64))")
export DETERMINISTIC_KEY=$(node -e "console.log('1'.repeat(64))")

# Run tests
npx tsx __tests__/encryption-manual-test.ts
```

## File Structure

```
skillsync_frontend/
├── lib/
│   ├── encryption.ts          # Core encryption utilities
│   └── encryptedApi.ts        # Encrypted API request helpers
├── hooks/
│   └── useEncryption.ts       # React encryption hooks
├── __tests__/
│   ├── encryption.test.ts     # Vitest unit tests
│   └── encryption-manual-test.ts  # Manual test script
└── .env.example               # Environment variable template
```

## Acceptance Criteria

- ✅ Sensitive fields encrypted before transmission
- ✅ AES-256-GCM encryption algorithm
- ✅ Encryption keys from environment variables
- ✅ Decryption automatic on data load
- ✅ Email field searchable via hash index
- ✅ Unit tests for encryption/decryption
- ✅ Performance overhead < 10ms per operation

## Production Considerations

For production deployment:

1. **Key Management**: Use AWS KMS, Azure Key Vault, or HashiCorp Vault
2. **Key Rotation**: Implement automated key rotation
3. **Audit Logging**: Log encryption/decryption operations
4. **Rate Limiting**: Prevent encryption oracle attacks
5. **HTTPS**: Always use HTTPS for API communication
6. **CSP**: Configure Content Security Policy headers
7. **Monitoring**: Monitor encryption failures and performance

## Troubleshooting

### "ENCRYPTION_KEY environment variable is required"

- Ensure `.env.local` exists with valid keys
- Restart development server after adding keys
- Keys must be 64 hex characters (32 bytes)

### Decryption fails

- Verify correct encryption key is being used
- Check ciphertext hasn't been corrupted
- Ensure same key used for encryption and decryption

### Performance issues

- Benchmark with `benchmarkEncryption()` function
- Consider batching encryption operations
- Check for unnecessary re-encryption

## Support

For issues or questions:
- Check test examples in `__tests__/`
- Review API reference above
- Consult security team for production deployment
