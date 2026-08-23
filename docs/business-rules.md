# Business Rules

1. **Inventory Management**
   - When an order is placed, `availableQuantity` decreases, and `reservedQuantity` increases.
   - When an order is fulfilled, `reservedQuantity` decreases.
   - If `availableQuantity` < ordered amount, checkout is blocked.

2. **Order Lifecycle**
   - `PLACED` -> `CONFIRMED` -> `PREPARING` -> `READY` -> `DELIVERED`/`PICKED_UP`.
   - Orders can only be cancelled before they reach `PREPARING`.

3. **Returns & Exchanges**
   - Can only be requested for orders in `DELIVERED` or `PICKED_UP` state.
   - Refunds process automatically upon return approval.

4. **Security**
   - JWT tokens expire in 24 hours.
   - Passwords must be hashed using BCrypt before storing.
