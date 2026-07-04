# Engineering Decisions

## Overview

Every software project is shaped by a series of engineering decisions.

This document explains the reasoning behind the major technical choices made during the design and implementation of the Lentis platform.

The goal is not simply to describe what technologies were selected, but to explain why they were chosen and how they support the long-term objectives of the application.

---

# Design Philosophy

Lentis is designed around a simple principle:

> Build software that solves real business problems while remaining secure, maintainable, and easy to evolve.

Whenever possible, engineering decisions favor long-term maintainability over short-term convenience.

---

# Why React?

React was selected for the frontend because of its component-based architecture.

Benefits include:

- Reusable UI components
- Clear separation of presentation logic
- Efficient rendering
- Strong ecosystem
- Long-term maintainability

React also supports incremental growth as additional business modules are introduced.

---

# Why ASP.NET Core?

ASP.NET Core was selected for the backend because it provides:

- High performance
- Built-in dependency injection
- Middleware architecture
- Strong security features
- Excellent REST API support
- Cross-platform deployment

Its architecture aligns well with scalable business applications.

---

# Why Layered Architecture?

Business logic is intentionally separated from user interface code and data access.

Benefits include:

- Easier maintenance
- Improved testing
- Better organization
- Reduced coupling
- Clear separation of responsibilities

This architecture allows individual layers to evolve without requiring widespread changes across the application.

---

# Why Entity Framework Core?

Entity Framework Core simplifies communication between the application and the database.

Reasons for selecting EF Core include:

- Strongly typed entities
- Migration support
- LINQ querying
- Relationship management
- Reduced boilerplate code

Using an ORM also keeps business logic focused on domain behavior rather than SQL implementation details.

---

# Why JWT Authentication?

JWT provides a secure and scalable method for authenticating users.

Authentication tokens allow the server to verify user identity while supporting stateless API communication.

JWT integrates naturally with modern web APIs and production deployments.

---

# Why HttpOnly Cookies?

Authentication tokens are stored in HttpOnly cookies rather than browser local storage.

This decision reduces exposure to client-side JavaScript and supports secure session handling.

Cookies also simplify authenticated requests because browsers automatically include them when communicating with trusted domains.

---

# Why Cloudflare?

Cloudflare was selected to provide:

- DNS management
- SSL certificate management
- HTTPS support
- Request routing
- Additional infrastructure protection

Separating traffic management from application hosting improves operational flexibility.

---

# Why Separate Frontend and Backend?

Frontend and backend services are deployed independently.

This architecture provides:

- Independent deployments
- Improved scalability
- Technology flexibility
- Clear API boundaries
- Better separation of concerns

Each service can evolve without tightly coupling application components.

---

# Why GitHub?

GitHub serves as the central source control platform.

Benefits include:

- Version control
- Branch management
- Pull request workflows
- Deployment integration
- Change history

Maintaining a complete project history supports collaboration and long-term maintenance.

---

# Why Documentation?

Documentation is treated as part of the software rather than an afterthought.

Well-written documentation helps:

- Future developers
- Future maintainers
- Technical reviewers
- Interview preparation
- Knowledge preservation

Engineering knowledge should remain with the project rather than depending on individual memory.

---

# Engineering Philosophy

Technology evolves continuously.

The long-term value of a software system comes from sound engineering principles rather than individual frameworks.

Lentis emphasizes:

- Business-driven design
- Secure-by-default development
- Clear architecture
- Operational reliability
- Continuous improvement
- Knowledge preservation

These principles are intended to remain stable even as technologies and infrastructure evolve.

---

# Key Takeaways

- Every major technology choice was made to support maintainability, security, and scalability.
- Business requirements drive technical decisions.
- Layered architecture encourages clean separation of responsibilities.
- Documentation is considered part of the engineering process.
- Long-term maintainability is prioritized over short-term implementation convenience.
- Engineering decisions should remain understandable years after the original implementation.
