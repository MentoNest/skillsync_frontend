# API Integration Guide

This directory contains the API client and authentication services for SkillSync frontend.

## Structure

- `client.ts` - Core API client with request/response handling
- `auth.ts` - Authentication endpoints (login, register)

## Setup

1. Copy `.env.example` to `.env.local` and configure your API URL:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

2. The API client is now ready to use in your components.

## Usage

### Login

```typescript
import { authApi } from '@/lib/api/auth';

const response = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});

// Response contains:
// - token: JWT token
// - user: { id, name, email, role }
```

### Register

```typescript
import { authApi } from '@/lib/api/auth';

const response = await authApi.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Response contains:
// - token: JWT token
// - user: { id, name, email, role }
```

## Features

### ✅ Loading States
Both forms show a loading spinner during API calls and disable the submit button.

### ✅ Error Handling
- Network errors display user-friendly messages
- API errors are shown in a red alert box above the form
- Field validation errors appear below each field

### ✅ Role-Based Redirect
After successful login/registration, users are redirected based on their role:
- `admin` → `/admin`
- `mentor` → `/mentor`
- `mentee` → `/mentee`

### ✅ Token Storage
JWT tokens are stored in localStorage along with user information.

## API Error Handling

The `ApiError` class provides structured error handling:

```typescript
try {
  await authApi.login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.message); // User-friendly message
    console.log(error.status);  // HTTP status code
    console.log(error.data);    // Raw error data
  }
}
```

## Backend API Expectations

The backend should respond with the following format:

### POST /auth/login
Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Success Response (200):
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "mentee"
  }
}
```

Error Response (400/401/500):
```json
{
  "message": "Invalid credentials"
}
```

### POST /auth/register
Request:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

Success Response (201):
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "mentee"
  }
}
```

Error Response (400/409/500):
```json
{
  "message": "Email already exists"
}
```

## Security Considerations

⚠️ **Note**: Currently using localStorage for token storage. Consider these improvements for production:

1. Use httpOnly cookies for token storage
2. Implement token refresh mechanism
3. Add CSRF protection
4. Use secure, sameSite cookies
5. Implement proper session management

## Future Enhancements

- [ ] Add token refresh functionality
- [ ] Implement logout endpoint
- [ ] Add password reset flow
- [ ] Move to secure cookie-based auth
- [ ] Add request/response interceptors
- [ ] Implement retry logic for failed requests
