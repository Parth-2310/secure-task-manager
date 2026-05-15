# Security Notes – Secure Task Manager

## April 7: Linux File Permissions

- 755 = rwxr-xr-x (owner: read/write/execute; group/others: read/execute)
- 644 = rw-r--r-- (owner: read/write; group/others: read only) – too permissive for secrets
- 600 = rw------- (owner: read/write; others: no access) – ideal for .env

Why it matters: On a shared server, a 644 .env file exposes your DB password to other users.
My practice: I will use environment variable injection (Render/Vercel) instead of file-based .env in production. For local development, I ensure my .env is not committed to git.

### TLS/SSL Handshake (High‑Level)
- **Purpose:** Encrypts data between browser and server (HTTPS).
- **Trigger:** Browser sees `https://` → automatically starts handshake before sending any HTTP data.
- **Key steps:**
  1. Client Hello (browser sends supported cipher suites + random number)
  2. Server Hello + SSL Certificate (server chooses cipher suite, sends digital ID card)
  3. Certificate verification (browser checks certificate is valid)
  4. Key exchange (browser encrypts a temporary session key with server's public key)

  ### SSL Certificate
- Proves the server is who it claims to be (prevents impersonation).
- Contains domain name, public key, issuer, expiry.

### Session Key
- Temporary symmetric key used to encrypt the entire conversation.
- Random numbers from steps 1 & 2 ensure each session key is unique (forward secrecy).

### Applied to My Code
- Deployment platforms (Render, Vercel) provide HTTPS automatically.
- Set cookie `secure: true` in production to only send over HTTPS.
- Never disable certificate verification.

## April 11 – Brute Force vs Credential Stuffing

**Brute force:** Many passwords on one account → Mitigation: rate limiting + bcrypt.

**Credential stuffing:** Stolen pairs from other sites → Mitigation: unique passwords, MFA, breached password detection.

**Why hashing alone is not enough:** Fast hashes (MD5, SHA1) can be cracked with rainbow tables or GPUs.  
**Solution:** Salt + slow hash (bcrypt).

## April 12 – Token Security: XSS vs CSRF

**XSS (Cross‑Site Scripting):** Attacker injects malicious JavaScript into a website. Can steal localStorage tokens and non‑httpOnly cookies. Mitigation: Sanitize user input, use httpOnly cookies.

**CSRF (Cross‑Site Request Forgery):** Attacker tricks user's browser into sending a forged request to a site where the user is logged in. Mitigation: Use SameSite=Strict cookies or anti‑CSRF tokens.

**My decision:** Store JWT in httpOnly, Secure, SameSite=Strict cookie. Benefits:
- httpOnly → JavaScript cannot read it → blocks XSS.
- SameSite=Strict → cookie not sent cross‑origin → blocks CSRF.
- Secure → only sent over HTTPS.

**Implementation (tomorrow):** res.cookie('token', jwt, { httpOnly: true, secure: true, sameSite: 'strict' })