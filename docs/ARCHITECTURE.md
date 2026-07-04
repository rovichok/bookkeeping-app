# Lentis Architecture

## Overview

Lentis is a production-ready full-stack business platform designed around a layered architecture that separates user interaction, business logic, data access, and infrastructure responsibilities.

The primary architectural objective is to build a system that is secure, maintainable, scalable, and easy to extend as new business features are introduced.

Rather than tightly coupling application components together, each layer has a clearly defined responsibility. This approach simplifies maintenance, testing, and future development.

---

# Architectural Principles

The application is built around the following engineering principles:

- Separation of concerns
- Layered architecture
- Single responsibility
- Secure-by-default design
- Reusable components
- Production readiness
- Scalability
- Maintainability

---

# High-Level Architecture

```text
                        User
                          │
                          ▼
              React Frontend (Vercel)
                          │
                  HTTPS REST API
                          │
                          ▼
         ASP.NET Core Web API (Render)
                          │
                Business Services
                          │
                          ▼
            Entity Framework Core
                          │
                          ▼
                   SQL Database

                 Cloudflare
        DNS • SSL • Request Routing
```

---

# Frontend Layer

The frontend provides the user interface and user experience.

Primary responsibilities include:

- User authentication
- Navigation
- Form validation
- Dashboard rendering
- API communication
- State management
- Responsive interface

The frontend does not contain business rules. Instead, it communicates with backend services through REST APIs.

---

# API Layer

The ASP.NET Core Web API serves as the communication boundary between the frontend and backend.

Responsibilities include:

- Authentication
- Authorization
- Request validation
- Routing
- Error handling
- Business workflow coordination

Every request passes through middleware before reaching the appropriate controller.

---

# Business Layer

The business layer contains the application's core business logic.

Examples include:

- Authentication workflows
- Lead management
- Validation rules
- Business processes
- Service coordination

Keeping business logic separate from controllers makes the application easier to maintain and test.

---

# Data Layer

Entity Framework Core manages communication with the database.

Responsibilities include:

- Entity mapping
- Query execution
- Data persistence
- Relationship management

Business services interact with the database through Entity Framework rather than embedding SQL directly throughout the application.

---

# Security Architecture

Security is implemented across multiple layers of the application.

Key components include:

- JWT authentication
- HttpOnly cookies
- HTTPS
- CORS policy
- Security headers
- Login rate limiting
- Protected administrative endpoints

Security is treated as a cross-cutting concern rather than a single feature.

---

# Infrastructure

Production infrastructure consists of:

Frontend

- Vercel

Backend

- Render

Traffic Management

- Cloudflare

Source Control

- GitHub

These services provide deployment, DNS management, SSL, version control, and operational reliability.

---

# Request Flow

A typical request follows this sequence:

1. User submits a request from the React application.
2. The request is sent securely over HTTPS.
3. Cloudflare routes the request to the backend API.
4. ASP.NET Core middleware validates the request.
5. Authentication and authorization are evaluated.
6. Controllers delegate work to business services.
7. Business services interact with Entity Framework Core.
8. Entity Framework communicates with the database.
9. Results are returned through the API to the frontend.

---

# Design Philosophy

The architecture favors simplicity over unnecessary complexity.

As new functionality is added—including client portals, vendor management, OCR processing, and QuickBooks integration—the existing layered structure allows these capabilities to be introduced without major architectural changes.

The long-term objective is to evolve Lentis into a modular business platform while preserving clean separation between presentation, business logic, data access, and infrastructure.
