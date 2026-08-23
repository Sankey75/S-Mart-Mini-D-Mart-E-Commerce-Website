# API Documentation

## Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and receive JWT

## Products & Categories
- `GET /api/products` - List all products
- `POST /api/products` - (Manager+) Create product
- `GET /api/categories` - List categories

## Cart & Orders
- `GET /api/cart` - View cart
- `POST /api/orders` - Place an order from cart
- `GET /api/orders/my-orders` - Get user's orders

## Fulfillment & Staff
- `PUT /api/fulfillment/{orderId}/status` - Update order status (Staff+)
- `GET /api/returns` - Get all returns (Staff+)
- `PUT /api/returns/{id}/status` - Process a return (Staff+)

## Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/audit-logs` - View system logs
