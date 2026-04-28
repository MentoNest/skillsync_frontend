'use client';

import { useState, useCallback } from 'react';
import { encrypt, decrypt, encryptDeterministic, createSearchHash, encryptPII, decryptPII } from '@/lib/encryption';

/**
 * Hook for encrypting/decrypting individual values
 */
export const useEncryption = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptValue = useCallback(async (plaintext: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await encrypt(plaintext);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Encryption failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const decryptValue = useCallback(async (ciphertext: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await decrypt(ciphertext);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Decryption failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const encryptForSearch = useCallback(async (plaintext: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await encryptDeterministic(plaintext);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Deterministic encryption failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSearchHash = useCallback(async (plaintext: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await createSearchHash(plaintext);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Hash creation failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    encryptValue,
    decryptValue,
    encryptForSearch,
    getSearchHash,
    isLoading,
    error,
  };
};

/**
 * Hook for encrypting/decrypting user PII data
 */
export const usePIIEncryption = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptUserData = useCallback(async (userData: Record<string, any>): Promise<Record<string, any> | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await encryptPII(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('PII encryption failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const decryptUserData = useCallback(async (userData: Record<string, any>): Promise<Record<string, any> | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await decryptPII(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('PII decryption failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    encryptUserData,
    decryptUserData,
    isLoading,
    error,
  };
};

/**
 * Hook for form field encryption
 */
export const useEncryptedForm = <T extends Record<string, any>>(initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [encryptedData, setEncryptedData] = useState<Partial<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const encryptField = useCallback(async (fieldName: keyof T) => {
    const value = data[fieldName];
    if (!value) return;

    setIsLoading(true);
    try {
      const encrypted = await encrypt(String(value));
      setEncryptedData(prev => ({ ...prev, [fieldName]: encrypted as any }));
    } catch (error) {
      console.error(`Failed to encrypt field ${String(fieldName)}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const encryptAll = useCallback(async (fields: (keyof T)[]) => {
    setIsLoading(true);
    try {
      const encrypted: Partial<T> = {};
      
      for (const field of fields) {
        const value = data[field];
        if (value !== undefined && value !== null) {
          encrypted[field] = await encrypt(String(value)) as any;
        }
      }
      
      setEncryptedData(encrypted);
      return encrypted;
    } catch (error) {
      console.error('Failed to encrypt fields:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const updateField = useCallback((fieldName: keyof T, value: T[keyof T]) => {
    setData(prev => ({ ...prev, [fieldName]: value }));
    // Clear encrypted value when field changes
    setEncryptedData(prev => {
      const newData = { ...prev };
      delete newData[fieldName];
      return newData;
    });
  }, []);

  return {
    data,
    encryptedData,
    updateField,
    encryptField,
    encryptAll,
    isLoading,
  };
};
