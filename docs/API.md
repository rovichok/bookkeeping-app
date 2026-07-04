# Lentis API Documentation

## Overview

The Lentis API powers both the public website and the administrative dashboard.

It exposes endpoints for:

- Contact form submissions
- Lead management
- Authentication
- Audit history
- Future workflow automation services

The API is built with ASP.NET Core Web API and communicates with the React frontend using secure HTTPS requests.

---

# Architecture

React Frontend
↓ HTTPS
ASP.NET Core API
↓
Application Services
↓
Entity Framework Core
↓
SQL Server

# API Design Principles

The Lentis API is designed around several engineering principles:

- RESTful resource design
- Stateless request processing
- Secure-by-default communication
- Layered architecture
- Separation of concerns
- Consistent request and response formats
- Version-aware evolution

---

# Base URLs

Development

https://localhost:5001/api

Production

https://api.lentisgroup.com/api

---

# Authentication

Authentication uses secure HttpOnly JWT cookies.

The browser never stores the JWT in localStorage or sessionStorage.

Cookie settings

- HttpOnly
- Secure
- SameSite=None
- HTTPS only

Authentication Flow

React Login
↓

POST /api/auth/login
↓

JWT Cookie Created
↓

Browser Stores Cookie
↓

Protected Requests
↓

Cookie Sent Automatically
↓

Authorization Middleware

---

# API Conventions

## Request Format

All requests use JSON.

Example

```json
{
  "email": "user@example.com",
  "password": "password"
}

Response Format

Successful responses

{
  "success": true,
  "data": {}
}

Validation errors

{
  "errors": [
    "Email is required."
  ]
}

Server errors

{
  "message": "Unexpected server error."
}

# Authentication Endpoints

## POST /api/auth/login

...

## GET /api/auth/me

...

## POST /api/auth/logout

# Contact Endpoints

## POST /api/contact

# Lead Management Endpoints

## GET /api/leads

# Key Takeaways

- The API follows RESTful design principles.
- Authentication is performed using secure HttpOnly JWT cookies.
- JSON is used for all request and response payloads.
- Protected endpoints require authentication.
- Consistent response formats simplify frontend integration.
- Future API expansion will occur through modular endpoint groups and versioning.
```
