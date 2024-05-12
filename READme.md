Inventory Management System API
===============================

This API allows you to manage products in an inventory. It supports the following operations:

1. Add a new product (POST /products)
2. Retrieve all products (GET /products)
3. Retrieve a specific product by its ID (GET /products/:id)
4. Update an existing product (PATCH /products/:id)
5. Delete a product (DELETE /products/:id)
6. Login (POST /login)
6. SignUp (POST /signup)

Each product has the following fields:

- name (required)
- categeory (required)
- price (required, numeric)
- quantity (required, numeric)
- supplier (required)
- description (required)

The API uses Express and Mongoose to handle requests and interact with MongoDB.

To start the server, run the following command in the terminal:

npm install
npm start
