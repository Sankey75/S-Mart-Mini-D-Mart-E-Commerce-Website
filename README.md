# S-Mart (Mini D-Mart) E-Commerce Platform

A production-quality full-stack Grocery Store platform that provides a complete e-commerce solution with role-based access control, product management, and a robust shopping cart system.

## 🚀 Features

- **Full Role-Based Access Control** (Customer, Staff, Manager, Admin)
- **Product & Category Management**
- **Shopping Cart & Checkout** with **Razorpay Integration** for payments
- **Delivery & Store Pickup Scheduling**
- **Returns & Exchanges**
- **Inventory Management**
- **Admin Auditing & Dashboards**

## 💻 Tech Stack

### Backend
- **Java 17 & Spring Boot 4**
- **Spring Security (JWT)** for robust authentication & authorization
- **Spring Data JPA & Hibernate**
- **MySQL** Database
- **Razorpay API** for payment processing

### Frontend
- **React 19 & Vite**
- **Tailwind CSS 4** for responsive and modern UI
- **Axios** for API communication
- **React Router** for navigation
- **React Hot Toast** for notifications

## 🛠️ Getting Started

### Prerequisites
- Java 17
- Node.js & npm
- MySQL Server
- Maven

### Backend Setup
1. Ensure your MySQL server is running.
2. Update the `backend/src/main/resources/application.properties` with your database credentials and Razorpay keys (or use the `.env.example` reference).
3. Navigate to the backend directory: `cd backend`
4. Build the project: `mvn clean install`
5. Run the Spring Boot application: `mvn spring-boot:run`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and go to the provided localhost URL.

## 🔑 Demo Accounts

Use the following credentials to explore different roles within the application:

- **Admin**: admin@minidmart.com / password
- **Manager**: manager@minidmart.com / password
- **Staff**: staff@minidmart.com / password
- **Customer**: customer@minidmart.com / password

## 📄 License
This project is proprietary and built as a comprehensive e-commerce showcase.
