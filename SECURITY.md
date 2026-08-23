# Security Policy

## Authentication
Authentication is handled statelessly via JWT (JSON Web Tokens). Tokens are issued upon successful login and are valid for 24 hours.

## Passwords
Passwords are never stored in plaintext. They are hashed using BCrypt (`BCryptPasswordEncoder`) with a strength factor of 10.

## Authorization
Role-Based Access Control is enforced at the controller level using Spring Security's `@PreAuthorize`.

## Reporting Vulnerabilities
If you discover any security vulnerabilities, please do not disclose them publicly. Open an issue on this repository to report them.
