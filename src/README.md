# Architecture Overview

This project follows a layered architecture inspired by
DDD (Domain-Driven Design) and Clean Architecture.

## Layers

- Domain: Pure business rules
- Application: Use cases / orchestration
- Infrastructure: External implementations (DB, APIs, fakes)

Rules:
- Domain does NOT depend on anything
- Application depends on Domain
- Infrastructure depends on Application
