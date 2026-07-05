# Lentis API

## Overview

Lentis.Api is the ASP.NET Core backend that powers the Lentis Business Platform.

It provides secure RESTful APIs for both the public website and the administrative application while coordinating business logic, authentication, and data persistence.

The API is designed using a layered architecture that separates controllers, services, and data access to improve maintainability and scalability.

---

# Technology Stack

* ASP.NET Core
* C#
* Entity Framework Core
* REST APIs
* SQL Database
* JWT Authentication
* HttpOnly Cookies

---

# Responsibilities

The backend is responsible for:

* Authentication and authorization
* Business logic
* Lead management
* API request processing
* Database communication
* Validation
* Logging
* Security enforcement

The frontend communicates exclusively through these APIs.

---

# Project Structure

```text
Lentis.Api
│
├── Controllers
├── Services
├── Data
├── Models
├── DTOs
├── Middleware
├── Authentication
├── Migrations
└── Program.cs
```

The project follows a layered architecture that separates presentation, business logic, and data access.

---

# Running the API

Typical development workflow:

1. Restore NuGet packages.
2. Configure application settings.
3. Apply Entity Framework Core migrations.
4. Start the ASP.NET Core application.
5. Connect the React frontend.

Environment-specific configuration should be managed using local configuration files and environment variables.

---

# Authentication

Authentication uses JWT tokens stored in secure HttpOnly cookies.

Protected endpoints require successful authentication before executing business operations.

For complete security details, see the project documentation.

---

# Related Documentation

Additional engineering documentation is available in the repository's `docs` directory.

* ARCHITECTURE.md
* SECURITY.md
* DEPLOYMENT.md
* DATABASE.md
* API.md
* ENGINEERING_DECISIONS.md
* PROJECT_HISTORY.md
* ROADMAP.md

These documents describe the engineering decisions, deployment architecture, security model, and long-term direction of the platform.

---

# Design Philosophy

The backend is designed to support long-term business growth.

Business logic remains independent from presentation logic, allowing the platform to evolve while maintaining clear separation of responsibilities.

The objective is to build secure, maintainable services that support business automation rather than tightly coupling functionality to individual user interfaces.
