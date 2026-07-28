# Authentication Integration - Testing Checklist

## Prerequisites
- [ ] Backend API is running and accessible
- [ ] `.env.local` file is configured with correct `NEXT_PUBLIC_API_URL`
- [ ] Frontend dev server is running (`npm run dev`)

## Login Form Tests

### Valid Login
- [ ] Navigate to `/login`
- [ ] Enter valid email and password
- [ ] Click "Login" button
- [ ] **Expected**: 
  - Button shows "Logging in..." with spinner
  - Button is disabled during request
  - On success: Redirects to role-based page
  - Token is stored in localStorage
  - User data is stored in localStorage

### Invalid Credentials
- [ ] Enter wrong email/password
- [ ] Click "Login" button
- [ ] **Expected**: 
  - Red error message appears above form
  - Error message shows API error (e.g., "Invalid credentials")
  - Form remains on login page

### Field Validation
- [ ] Try to submit with empty email
- [ ] **Expected**: "Email is required" error below field
- [ ] Enter invalid email format (e.g., "test")
- [ ] **Expected**: "Enter a valid email address" error
- [ ] Enter empty password
- [ ] **Expected**: "Password is required" error
- [ ] Submit button should be disabled when form is invalid

### Network Error
- [ ] Stop backend API
- [ ] Try to login
- [ ] **Expected**: "Network error. Please check your connection." message

### Loading State
- [ ] Submit form and observe button
- [ ] **Expected**:
  - Spinner appears next to text
  - Text changes to "Logging in..."
  - Button is disabled
  - Cursor shows not-allowed

## Register Form Tests

### Valid Registration
- [ ] Navigate to `/register`
- [ ] Enter full name, valid email, and password (8+ chars)
- [ ] Confirm password matches
- [ ] Click "Create Account" button
- [ ] **Expected**: 
  - Button shows "Creating account..." with spinner
  - Button is disabled during request
  - On success: Redirects to role-based page
  - Token is stored in localStorage
  - User data is stored in localStorage

### Duplicate Email
- [ ] Try to register with existing email
- [ ] **Expected**: Error message (e.g., "Email already exists")

### Password Mismatch
- [ ] Enter different passwords in password and confirm password
- [ ] **Expected**: "Passwords don't match" error below confirm password field

### Field Validation
- [ ] Try empty name: "Full name is required"
- [ ] Try invalid email: "Enter a valid email address"
- [ ] Try password < 8 chars: "Password must be at least 8 characters"
- [ ] Try empty confirm password: "Please confirm your password"

### Loading State
- [ ] Submit form and observe button
- [ ] **Expected**:
  - Spinner appears next to text
  - Text changes to "Creating account..."
  - Button is disabled

## Role-Based Redirect Tests

### Admin Role
- [ ] Login/Register as admin user
- [ ] **Expected**: Redirects to `/admin`

### Mentor Role
- [ ] Login/Register as mentor user
- [ ] **Expected**: Redirects to `/mentor`

### Mentee Role
- [ ] Login/Register as mentee user
- [ ] **Expected**: Redirects to `/mentee`

## localStorage Tests

### Token Storage
- [ ] Login successfully
- [ ] Open browser DevTools → Application/Storage → Local Storage
- [ ] **Expected**: 
  - `token` key exists with JWT value
  - `user` key exists with JSON user object

### User Data Storage
- [ ] Check `user` value in localStorage
- [ ] **Expected**: Contains `{ id, name, email, role }`

## Error Recovery Tests

### Clear Error on Retry
- [ ] Trigger an error (wrong credentials)
- [ ] Verify error message appears
- [ ] Correct credentials and submit again
- [ ] **Expected**: Error message disappears

### Multiple Errors
- [ ] Trigger network error
- [ ] Note error message
- [ ] Fix network and trigger validation error
- [ ] **Expected**: Only latest error shows

## Accessibility Tests

### Keyboard Navigation
- [ ] Use Tab to navigate through form fields
- [ ] Press Enter on submit button
- [ ] **Expected**: Form submits properly

### Screen Reader
- [ ] Error messages have `role="alert"`
- [ ] Input fields have `aria-invalid` when errors exist
- [ ] Labels are properly associated with inputs

## API Request Format Tests

### Login Request
Check network tab for:
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register Request
Check network tab for:
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```
Note: `confirmPassword` should NOT be sent

## Browser Console Tests

- [ ] No console errors during normal flow
- [ ] No console warnings
- [ ] Network requests visible in Network tab
- [ ] Proper request/response headers

## Edge Cases

### Very Long Email
- [ ] Enter 100+ character email
- [ ] **Expected**: Handles gracefully

### Special Characters in Password
- [ ] Use password with special chars: `P@ssw0rd!#$`
- [ ] **Expected**: Works correctly

### Slow Network
- [ ] Throttle network in DevTools
- [ ] **Expected**: Loading state persists until response

### Backend Down
- [ ] Stop backend completely
- [ ] **Expected**: Network error message displays

## Known Issues / Notes

- localStorage is used for token storage (not production-ready)
- No token refresh mechanism yet
- No logout functionality yet
- Consider adding "Remember me" option
- Consider adding "Forgot password" link

## Test Results

| Test Category | Pass/Fail | Notes |
|---------------|-----------|-------|
| Login - Valid |           |       |
| Login - Invalid |         |       |
| Register - Valid |        |       |
| Register - Duplicate |    |       |
| Field Validation |        |       |
| Loading States |          |       |
| Error Handling |          |       |
| Role Redirects |          |       |
| localStorage |            |       |
| Network Errors |          |       |

## Next Steps After Testing

1. Fix any bugs found
2. Implement logout functionality
3. Add password reset flow
4. Consider migrating to secure cookie-based auth
5. Add request retry logic
6. Implement token refresh
