import { encrypt, decrypt, encryptPII, decryptPII, createSearchHash } from '@/lib/encryption';

/**
 * Configuration for encrypted API requests
 */
interface EncryptedRequestConfig {
  /** Fields to encrypt before sending */
  encryptFields?: string[];
  /** Fields to decrypt after receiving response */
  decryptResponseFields?: string[];
  /** Whether to encrypt all PII fields automatically */
  encryptPII?: boolean;
  /** Whether to decrypt PII fields in response */
  decryptPII?: boolean;
}

/**
 * Make an encrypted POST request
 * Automatically encrypts specified fields before sending
 * 
 * @param url - API endpoint
 * @param data - Request payload
 * @param config - Encryption configuration
 * @returns API response with decrypted data
 */
export const encryptedPost = async <T = any>(
  url: string,
  data: Record<string, any>,
  config: EncryptedRequestConfig = {}
): Promise<T> => {
  const {
    encryptFields = [],
    decryptResponseFields = [],
    encryptPII: shouldEncryptPII = false,
    decryptPII: shouldDecryptPII = false,
  } = config;

  // Encrypt sensitive fields
  let encryptedData = { ...data };

  if (shouldEncryptPII) {
    encryptedData = await encryptPII(encryptedData);
  }

  if (encryptFields.length > 0) {
    for (const field of encryptFields) {
      if (encryptedData[field] !== undefined && encryptedData[field] !== null) {
        encryptedData[field] = await encrypt(String(encryptedData[field]));
      }
    }
  }

  // Make the request
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptedData),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const responseData = await response.json();

  // Decrypt response fields if needed
  if (shouldDecryptPII || decryptResponseFields.length > 0) {
    let decryptedData = { ...responseData };

    if (shouldDecryptPII) {
      decryptedData = await decryptPII(decryptedData);
    }

    if (decryptResponseFields.length > 0) {
      for (const field of decryptResponseFields) {
        if (decryptedData[field] !== undefined && decryptedData[field] !== null) {
          decryptedData[field] = await decrypt(decryptedData[field]);
        }
      }
    }

    return decryptedData as T;
  }

  return responseData as T;
};

/**
 * Make an encrypted PUT/PATCH request
 * 
 * @param url - API endpoint
 * @param data - Request payload
 * @param config - Encryption configuration
 * @returns API response with decrypted data
 */
export const encryptedPut = async <T = any>(
  url: string,
  data: Record<string, any>,
  config: EncryptedRequestConfig = {}
): Promise<T> => {
  const {
    encryptFields = [],
    decryptResponseFields = [],
    encryptPII: shouldEncryptPII = false,
    decryptPII: shouldDecryptPII = false,
  } = config;

  let encryptedData = { ...data };

  if (shouldEncryptPII) {
    encryptedData = await encryptPII(encryptedData);
  }

  if (encryptFields.length > 0) {
    for (const field of encryptFields) {
      if (encryptedData[field] !== undefined && encryptedData[field] !== null) {
        encryptedData[field] = await encrypt(String(encryptedData[field]));
      }
    }
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptedData),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const responseData = await response.json();

  if (shouldDecryptPII || decryptResponseFields.length > 0) {
    let decryptedData = { ...responseData };

    if (shouldDecryptPII) {
      decryptedData = await decryptPII(decryptedData);
    }

    if (decryptResponseFields.length > 0) {
      for (const field of decryptResponseFields) {
        if (decryptedData[field] !== undefined && decryptedData[field] !== null) {
          decryptedData[field] = await decrypt(decryptedData[field]);
        }
      }
    }

    return decryptedData as T;
  }

  return responseData as T;
};

/**
 * Search using encrypted hash
 * Creates a hash of the search term and sends it for exact match lookup
 * 
 * @param url - API endpoint
 * @param searchTerm - Value to search for (e.g., email)
 * @param fieldName - Name of the field being searched
 * @returns Search results
 */
export const encryptedSearch = async <T = any>(
  url: string,
  searchTerm: string,
  fieldName: string
): Promise<T> => {
  const searchHash = await createSearchHash(searchTerm);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      field: fieldName,
      hash: searchHash,
    }),
  });

  if (!response.ok) {
    throw new Error(`Search request failed: ${response.statusText}`);
  }

  return response.json() as T;
};

/**
 * Encrypted user registration
 * Automatically encrypts all PII fields before sending
 * 
 * @param userData - User registration data
 * @returns Registration response
 */
export const registerUser = async (userData: Record<string, any>) => {
  return encryptedPost('/api/auth/register', userData, {
    encryptPII: true,
    decryptPII: true,
  });
};

/**
 * Encrypted user profile update
 * 
 * @param userId - User ID
 * @param profileData - Profile data to update
 * @returns Updated user data
 */
export const updateUserProfile = async (
  userId: string,
  profileData: Record<string, any>
) => {
  return encryptedPut(`/api/users/${userId}/profile`, profileData, {
    encryptPII: true,
    decryptPII: true,
  });
};

/**
 * Search for user by email (using hash)
 * 
 * @param email - Email address to search
 * @returns User data if found
 */
export const searchUserByEmail = async (email: string) => {
  return encryptedSearch('/api/users/search', email, 'email');
};
