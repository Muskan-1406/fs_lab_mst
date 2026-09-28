# Set C - Q1 (5 Marks)

## Authentication vs Authorization

| | Authentication | Authorization |
|---|---|---|
| Question answered | "Who are you?" | "What are you allowed to do?" |
| Purpose | Verifies identity | Grants or denies access to resources |
| Happens | First | After authentication |
| Based on | Credentials (password, OTP, biometrics) | Roles, permissions, policies |
| Example | Logging in with username and password | Admin can delete posts; Viewer can only read |
| Failure response | 401 Unauthorized | 403 Forbidden |

## Structure of a JWT (JSON Web Token)

A JWT is a compact string made of three Base64URL-encoded parts separated by dots:

`xxxxx.yyyyy.zzzzz` -> `Header.Payload.Signature`

1. **Header** - token type (`JWT`) and signing algorithm, e.g. `{ "alg": "HS256", "typ": "JWT" }`.
2. **Payload** - the claims: user data such as `sub` (user id), `role`, `iat` (issued at) and `exp` (expiry), e.g. `{ "sub": "101", "role": "Admin", "exp": 1735689600 }`.
3. **Signature** - created by signing `base64(header) + "." + base64(payload)` with a secret key: `HMACSHA256(data, secret)`. It proves the token was not tampered with.

The client sends the token in the `Authorization: Bearer <token>` header. The server verifies the signature and reads the role from the payload to decide what the user may access. The payload is only encoded, not encrypted, so never put secrets in it.
