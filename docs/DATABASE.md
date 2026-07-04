# Lentis Database

## Overview

The Lentis database stores the business information required to support administrative workflows, customer interactions, authentication, and future bookkeeping automation.

The database is designed around a relational model that emphasizes data integrity, maintainability, and future expansion.

Entity Framework Core is used as the Object-Relational Mapper (ORM), allowing the application to work with strongly typed domain models while managing database persistence.

---

# Database Objectives

The database is designed to:

- Store business data reliably
- Maintain data integrity
- Support scalable application growth
- Reduce data duplication
- Simplify maintenance
- Support future business modules

---

# High-Level Data Model

```text
Administrator
      │
      │
      ▼
Authentication

Lead
      │
      ▼
Audit History

Future Modules
      │
      ├── Clients
      ├── Vendors
      ├── Inventory
      ├── Invoices
      ├── Cleanup Estimates
      └── OCR Documents
```

The current data model focuses on lead management while providing a foundation for future bookkeeping and workflow automation.

---

# Entity Framework Core

Entity Framework Core serves as the data access layer.

Responsibilities include:

- Entity mapping
- Relationship management
- Query generation
- Database persistence
- Change tracking
- Migration management

Application services interact with Entity Framework rather than embedding SQL directly throughout the application.

---

# Current Domain Entities

## Administrator

Stores administrative user information required for secure authentication and authorization.

Typical responsibilities include:

- Identity
- Login credentials
- Authorization information

---

## Lead

Represents prospective clients submitting inquiries through the public website.

Typical information includes:

- Name
- Email
- Phone number
- Company
- Message
- Submission date

Leads provide the starting point for customer engagement and administrative follow-up.

---

## Audit History

Audit records capture important administrative actions within the application.

Examples include:

- Authentication events
- Administrative actions
- System activity
- Future workflow events

Audit information supports operational visibility and accountability.

---

# Relationships

The database follows standard relational principles.

Examples include:

- One administrator may perform many administrative actions.
- One lead may generate multiple future workflow events.
- Future client records may be associated with multiple bookkeeping activities.

Relationships are modeled through Entity Framework Core using navigation properties and foreign keys.

---

# Data Integrity

The application protects data quality through:

- Entity validation
- Required fields
- Referential integrity
- Controlled updates
- Server-side validation

Business rules are enforced within the application before data is persisted.

---

# Database Migrations

Schema changes are managed through Entity Framework Core migrations.

Migrations provide:

- Version-controlled schema evolution
- Repeatable deployments
- Consistent database updates across environments

Database schema changes are treated as part of the application's source code.

---

# Future Database Expansion

The database architecture is intentionally designed for growth.

Planned business modules include:

- Client management
- Vendor management
- Invoice processing
- Inventory valuation
- OCR document storage
- Workflow automation
- Reporting and analytics

The relational design allows new entities and relationships to be introduced while preserving existing data.

---

# Database Philosophy

The database is designed around business concepts rather than application screens.

Instead of modeling individual user interfaces, the database models real business entities and their relationships.

This approach supports reuse, reporting, integration, and long-term maintainability.

---

# Key Takeaways

- The database follows a relational design centered on business entities.
- Entity Framework Core manages data access and persistence.
- Data integrity is protected through validation and relational constraints.
- Database schema changes are managed using migrations.
- The design supports future expansion without requiring major structural changes.
- Business entities drive the data model rather than individual application screens.
