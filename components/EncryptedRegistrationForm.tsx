'use client';

import { useState } from 'react';
import { useEncryptedForm } from '@/hooks/useEncryption';
import { registerUser } from '@/lib/encryptedApi';

export default function EncryptedRegistrationForm() {
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
    phone: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Encrypt all PII fields before submission
      const encrypted = await encryptAll([
        'email',
        'firstName',
        'lastName',
        'phone',
      ]);

      if (!encrypted) {
        setError('Failed to encrypt data');
        return;
      }

      // Send encrypted data to API
      const result = await registerUser({
        ...encrypted,
        password: encrypted.password, // Password should be hashed on backend
      });

      setSubmitted(true);
      console.log('Registration successful:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Registration Successful!
        </h2>
        <p className="text-gray-600">
          Your data has been encrypted and securely stored.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Create Account (Encrypted)
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="John"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Doe"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+1234567890"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => updateField('password', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Encryption Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-xs">
            🔒 Your personal information will be encrypted using AES-256-GCM before transmission.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Encrypting & Submitting...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
