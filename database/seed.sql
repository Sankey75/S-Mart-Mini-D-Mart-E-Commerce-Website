INSERT INTO roles (name) VALUES ('ROLE_CUSTOMER'), ('ROLE_STAFF'), ('ROLE_MANAGER'), ('ROLE_ADMIN');

-- Password is 'password' hashed with BCrypt
INSERT INTO users (name, email, password, active) VALUES 
('Admin User', 'admin@minidmart.com', '$2a$10$T1b/R3Hn.n5S51QZ91DMeOqC5Z4P5rZ8J7c3V4M7L1S2V3N4B5C6D', true),
('Manager User', 'manager@minidmart.com', '$2a$10$T1b/R3Hn.n5S51QZ91DMeOqC5Z4P5rZ8J7c3V4M7L1S2V3N4B5C6D', true),
('Staff User', 'staff@minidmart.com', '$2a$10$T1b/R3Hn.n5S51QZ91DMeOqC5Z4P5rZ8J7c3V4M7L1S2V3N4B5C6D', true),
('Customer User', 'customer@minidmart.com', '$2a$10$T1b/R3Hn.n5S51QZ91DMeOqC5Z4P5rZ8J7c3V4M7L1S2V3N4B5C6D', true);

INSERT INTO user_roles (user_id, role_id) VALUES 
(1, 4), -- Admin -> ROLE_ADMIN
(2, 3), -- Manager -> ROLE_MANAGER
(3, 2), -- Staff -> ROLE_STAFF
(4, 1); -- Customer -> ROLE_CUSTOMER

INSERT INTO categories (name, description) VALUES 
('Groceries', 'Daily grocery items'),
('Electronics', 'Gadgets and appliances');

INSERT INTO products (name, description, price, sku, category_id, active) VALUES 
('Organic Milk', '1L Fresh Organic Milk', 2.50, 'GROC-MILK-1L', 1, true),
('Whole Wheat Bread', 'Fresh baked loaf', 1.80, 'GROC-BREAD-01', 1, true),
('Wireless Mouse', 'Ergonomic wireless mouse', 15.99, 'ELEC-MOUSE-01', 2, true);

INSERT INTO inventory (available_quantity, reserved_quantity, low_stock_threshold, product_id) VALUES 
(100, 0, 10, 1),
(50, 0, 5, 2),
(25, 0, 2, 3);
