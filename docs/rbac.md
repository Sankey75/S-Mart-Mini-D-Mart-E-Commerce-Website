# Role-Based Access Control (RBAC)

The platform supports 4 distinct roles, each with increasing permissions.

## 1. CUSTOMER (`ROLE_CUSTOMER`)
- Can browse products and categories.
- Can manage their own cart.
- Can place orders.
- Can view their own order history.
- Can request returns and exchanges for their own eligible orders.

## 2. STAFF (`ROLE_STAFF`)
- Has all CUSTOMER permissions.
- Can view all orders in the system.
- Can transition orders through fulfillment stages (`CONFIRMED` -> `PREPARING` -> `READY`).
- Can manage pickups and deliveries.
- Can process returns and exchanges.

## 3. MANAGER (`ROLE_MANAGER`)
- Has all STAFF permissions.
- Can manage the product catalog (Create, Update, Delete).
- Can manage categories.
- Can manage and adjust inventory levels.
- Can view high-level platform reports and analytics.

## 4. ADMIN (`ROLE_ADMIN`)
- Has all MANAGER permissions.
- Can manage user accounts (Activate/Deactivate, change roles).
- Can view the platform Audit Logs to monitor sensitive actions.
