# S-Mart (Mini D-Mart) E-Commerce Platform

**🌐 Live Demo:** [https://s-mart-mini-d-mart-e-commerce-websi.vercel.app/](https://s-mart-mini-d-mart-e-commerce-websi.vercel.app/)

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

## 🔑 Testing the Application

To explore the Admin dashboard and restricted areas, you must create a new Admin account.

1. Go to the Registration page.
2. Select **Admin** from the Role dropdown.
3. When prompted for the Admin Secret Code, enter: `admin123`

You can also register as a normal Customer (which requires no secret code) to test the shopping cart and checkout flows.

## 📄 License
This project is proprietary and built as a comprehensive e-commerce showcase.
