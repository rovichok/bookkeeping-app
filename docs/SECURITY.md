# Lentis Security

## Overview

Security is a fundamental design principle of the Lentis platform rather than a feature added after development.

The application uses multiple layers of protection to help secure authentication, API communication, and deployment infrastructure. Rather than relying on a single security mechanism, Lentis follows a defense-in-depth approach where multiple controls work together to reduce risk.

---

# Security Objectives

The primary security goals of the platform are:

- Protect user authentication
- Prevent unauthorized access
- Secure communication between frontend and backend
- Protect sensitive application data
- Reduce common web application vulnerabilities
- Support secure production deployment

---

# Authentication

Lentis authenticates administrative users using JSON Web Tokens (JWT).

After successful authentication, the server issues a secure HttpOnly cookie containing the authentication token. The cookie is automatically included with subsequent requests to protected API endpoints.

This approach keeps authentication under server control while reducing exposure to client-side JavaScript.

---

# HttpOnly Cookies

Authentication tokens are stored in HttpOnly cookies rather than browser local storage.

This provides several advantages:

- JavaScript cannot directly access authentication tokens.
- Authentication is automatically included with secure requests.
- The risk of token theft through client-side scripting is reduced.
- Session management remains consistent across protected requests.

---

# Authorization

Authentication confirms a user's identity.

Authorization determines which resources that user is permitted to access.

Protected administrative endpoints require valid authentication before business operations are executed.

Unauthorized requests are rejected before reaching application logic.

---

# HTTPS

All communication between the frontend and backend is performed over HTTPS.

HTTPS protects data transmitted between clients and the server by providing:

- Encryption
- Data integrity
- Server identity verification

Unencrypted HTTP traffic is not used for authenticated application communication.

---

# Cross-Origin Resource Sharing (CORS)

The frontend and backend are deployed as separate applications.

A CORS policy restricts API access to trusted frontend origins.

This helps prevent unauthorized websites from making authenticated requests to the API.

Only approved application domains are permitted.

---

# Security Headers

The application returns security-related HTTP headers to improve browser protection.

Examples include:

- Content Security Policy (CSP)
- X-Frame-Options
- Referrer Policy
- Permissions Policy
- Strict Transport Security (HSTS)

These headers reduce exposure to common browser-based attacks and encourage secure communication.

---

# Login Protection

Authentication endpoints are protected with rate limiting.

Rate limiting reduces the effectiveness of automated password guessing and other abusive login behavior by limiting repeated authentication attempts within a defined period.

---

# Cloud Infrastructure

Production infrastructure contributes to the application's security.

Cloudflare provides:

- DNS management
- SSL certificate management
- Secure request routing
- Additional protection between users and application services

Frontend and backend services are deployed independently while communicating through secure HTTPS connections.

---

# Logging and Monitoring

The application uses structured backend logging to assist with operational monitoring and troubleshooting.

Logging supports:

- Error investigation
- Production diagnostics
- Operational visibility

Sensitive authentication information is not intentionally written to application logs.

---

# Secure Development Practices

Security considerations are incorporated throughout development.

Examples include:

- Server-side validation
- Layered architecture
- Separation of concerns
- Protected administrative endpoints
- Secure configuration management
- Environment-specific configuration

---

# Security Philosophy

Lentis is designed using a defense-in-depth approach.

Instead of relying on a single security mechanism, multiple independent protections work together to reduce overall risk.

Authentication, authorization, HTTPS, browser security headers, secure cookies, rate limiting, infrastructure configuration, and operational monitoring collectively provide a stronger security posture than any individual control alone.

Security is treated as an ongoing engineering responsibility and is continuously reviewed as the platform evolves.

---

# Key Takeaways

- Security is integrated into every layer of the application.
- Authentication and authorization are handled independently.
- Secure HttpOnly cookies protect authentication tokens.
- HTTPS encrypts all communication between clients and servers.
- CORS limits API access to trusted frontend applications.
- Security headers provide additional browser protections.
- Cloud infrastructure supports secure deployment and traffic management.
- Security is continuously improved as the platform grows.
