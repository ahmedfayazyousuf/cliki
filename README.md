Cliki Web App
Cliki is a web application designed for managing and viewing products, with functionality for both regular users and admins. It allows users to view products, add them to a shopping cart, and manage the inventory from an admin dashboard.
This is a test project for my application to Fliki.

Features
User authentication (login and signup)
Product browsing and shopping cart functionality
Admin dashboard for managing products and inventory
Technologies Used
Radix UI: Provides a set of accessible and customizable UI components for building the user interface.
MongoDB: Used as the database to store user and product data.
ReactJS: Powers the frontend of the web application, enabling dynamic and interactive user interfaces.
ExpressJS: Serves as the backend framework for handling API requests and server-side logic.
Jotai: Manages state across the application, particularly for the shopping cart functionality.

The app is made to be responsive, with a simple sleek design.

Getting Started
Clone the Repository

Open your browser and go to http://localhost:3000 to view the application locally.
Open your browser and go to https://cliki.vercel.app/ to view the application deployed.

The server is deployed on https://clikiserver.vercel.app/

In order to access the admin side to upload products kindly follow the following steps:
go to https://cliki.vercel.app/admindashboard
email: admin@gmail.com
password: admin12345

API Endpoints
POST /api/users/register: Register a new user.
POST /api/users/login: Login an existing user.
GET /api/products: Fetch all products (requires authentication).
POST /api/products/add: Add a new product (admin only).

Project Start Date and Time: 10 PM, 27 July 2024
Project End Date and Time: 10 PM, 28 July 2024