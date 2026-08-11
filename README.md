# Restaurant Ordering System

A full-stack restaurant ordering system built with Spring Boot and React.

## 📌 Project Overview

The Restaurant Ordering System allows customers to browse the restaurant menu, add items to their cart, manage their delivery addresses, and place orders.

Administrators can manage menu items and categories, view and process customer orders, view customer delivery locations, and access sales reports.

## 🚀 Features

### 👤 Customer

- Customer registration and login
- Login validation
- Browse restaurant menu
- Browse menu items by category
- Select menu item options
- Add items to cart
- Increase and decrease item quantities
- Remove items from cart
- Add special instructions to orders
- Select payment method
- Save multiple delivery addresses
- Select a saved address when placing an order
- Use GPS to save the customer's location
- View order history
- View order details
- Manage profile information
- Change password

### 👨‍💼 Administrator

- Admin login
- Admin dashboard
- View customer orders
- View order details
- Accept orders
- Reject orders with a reason
- Update order status
- Manage categories
- Manage menu items
- Manage menu item options
- View customer delivery location
- View sales reports
- View best-selling items

## 🛠️ Technologies

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- REST API

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router
- Bootstrap

### Development Tools

- Eclipse
- Visual Studio Code
- Git
- GitHub
- XAMPP / MySQL

## 📂 Project Structure

restaurant-ordering-system/
│
├── restaurant-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── ...
│
├── restaurant-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── ...
│
└── README.md



⚙️ Backend Setup
1. Requirements

Make sure you have:

-Java JDK
-Maven
-MySQL
-Eclipse or another Java IDE

2. Create the database

Create a MySQL database named:

CREATE DATABASE restaurant_db;


3. Configure the database

Open:

restaurant-backend/src/main/resources/application.properties

Configure your MySQL connection:

spring.datasource.url=jdbc:mysql://localhost:3307/restaurant_db
spring.datasource.username=root
spring.datasource.password=

server.port=8081

Change the username, password, or port if your MySQL configuration is different.


4. Run the backend

From the restaurant-backend folder:

mvn spring-boot:run

The backend runs on:

http://localhost:8081



💻 Frontend Setup
1. Requirements

Make sure you have:

Node.js
npm

2. Install dependencies

Open a terminal inside:

restaurant-frontend

Run:

npm install


3. Configure the API URL

Create a .env file in the frontend folder:

VITE_API_URL=http://localhost:8081

Do not commit your .env file to GitHub.


4. Run the frontend
npm run dev

The Vite development server will provide a local URL, usually:

http://localhost:5173


🔐 Security

Sensitive information such as passwords, API keys, and secret keys should not be committed to GitHub.

Environment-specific configuration should be stored in .env files or appropriate environment variables.

📊 Main System Components

The backend is organized into several layers:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database

DTOs are used for communication between the frontend and backend.

The frontend communicates with the backend through REST API endpoints using Axios.

📍 Location System

Customers can save multiple delivery addresses.

Each saved address can contain:

Address description
Latitude
Longitude

The selected address is associated with the customer's order so that the administrator can view the delivery location.

💳 Payment Methods

The system currently supports:

Cash
Credit Card


📦 Order Management

Orders can move through different statuses during the ordering process.
Administrators can accept or reject orders and provide a rejection reason when necessary.


📈 Sales Reports

Administrators can access sales information and best-selling menu items through the sales report section.


🔮 Future Improvements

Possible future improvements include:

Online payment integration
JWT authentication
Password encryption improvements
Order notifications
Real-time order tracking
Restaurant delivery management
Customer reviews and ratings
Improved responsive design
Production deployment


👨‍💻 Author

Ahmad Alanad

Software Engineer

📄 License

This project was developed as a software engineering project.