# Lentis Deployment

## Overview

Lentis is deployed as a cloud-hosted, production-ready application using separate frontend and backend services.

The deployment architecture emphasizes security, scalability, reliability, and maintainability by separating application responsibilities across specialized cloud platforms.

---

# Deployment Objectives

The production deployment is designed to:

- Separate frontend and backend services
- Support secure HTTPS communication
- Simplify deployments
- Improve scalability
- Enable continuous delivery
- Maintain operational reliability

---

# Production Architecture

```text
                        Users
                          │
                          ▼
                    Cloudflare
               DNS • SSL • Routing
                  │             │
                  ▼             ▼
      React Frontend         ASP.NET Core API
          (Vercel)              (Render)
                  │
                  ▼
            SQL Database
```

Each component has a clearly defined responsibility within the production environment.

---

# Frontend Deployment

The React frontend is hosted on **Vercel**.

Responsibilities include:

- Serving the user interface
- Static asset delivery
- Client-side routing
- Secure communication with the backend API

Frontend deployments are performed directly from the GitHub repository.

---

# Backend Deployment

The ASP.NET Core Web API is hosted on **Render**.

Responsibilities include:

- Authentication
- Authorization
- Business logic
- REST API endpoints
- Database communication
- Logging
- Validation

Backend deployments are automatically built and deployed from GitHub.

---

# DNS and Traffic Management

Cloudflare manages:

- DNS records
- SSL certificates
- HTTPS
- Request routing

Cloudflare serves as the public entry point for application traffic while directing requests to the appropriate frontend or backend service.

---

# HTTPS

All production communication occurs over HTTPS.

HTTPS protects:

- Authentication requests
- API communication
- Administrative access
- User interactions

Encrypted communication is required throughout the application.

---

# Deployment Workflow

A typical deployment follows this process:

1. Changes are committed locally.
2. Code is pushed to GitHub.
3. Cloud hosting platforms detect repository changes.
4. Automated builds are executed.
5. Successful builds are deployed.
6. Cloudflare routes production traffic to the updated services.

This workflow minimizes manual deployment steps while supporting repeatable releases.

---

# Environment Configuration

Production configuration is separated from application code.

Examples include:

- API endpoints
- Authentication settings
- Connection strings
- Allowed origins
- Cloud platform configuration

Environment-specific settings are managed securely through hosting platform configuration rather than being hard-coded into the application.

---

# Deployment Considerations

The deployment architecture is designed to support:

- Secure authentication
- Cross-domain communication
- Cloud scalability
- Independent frontend and backend deployments
- Operational monitoring
- Future feature expansion

Separating application components allows each service to evolve independently while maintaining secure communication.

---

# Production Monitoring

Operational monitoring supports application reliability.

Current monitoring includes:

- Structured backend logging
- Health endpoint monitoring
- Platform diagnostics
- Deployment status monitoring

Monitoring assists with identifying issues, troubleshooting production problems, and maintaining service availability.

---

# Continuous Improvement

The deployment architecture will continue to evolve as the platform grows.

Future improvements may include:

- Expanded automated testing
- Enhanced deployment validation
- Infrastructure automation
- Performance monitoring
- Additional operational dashboards

---

# Key Takeaways

- Frontend and backend are deployed independently.
- Cloudflare manages DNS, SSL, and traffic routing.
- Vercel hosts the React frontend.
- Render hosts the ASP.NET Core backend.
- HTTPS secures all production communication.
- GitHub provides version control and deployment integration.
- Environment-specific configuration is separated from application code.
- The deployment architecture supports scalability, maintainability, and operational reliability.
