# Mini D-Mart Architecture

## Backend Architecture
- **Spring Boot 3**: Core framework
- **Spring Security & JWT**: Stateless authentication
- **Spring Data JPA**: ORM and database interactions
- **MySQL**: Persistent storage
- **Clean Layered Architecture**: 
  - Controllers (API Layer)
  - Services (Business Logic Layer)
  - Repositories (Data Access Layer)
  - Entities (Domain Model)

## Frontend Architecture
- **React (Vite)**: Lightning-fast frontend build tool
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Axios**: HTTP client with global interceptors for JWT
- **Context API**: Global state management (Cart)

## Design Patterns Used
- **DTO Pattern**: Decoupling internal entities from external APIs.
- **Singleton**: Spring components are singletons by default.
- **Filter Chain**: Used in Spring Security for request interception.
