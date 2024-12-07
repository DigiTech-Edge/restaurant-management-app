# Restaurant Management API Documentation

## Overview

This API provides a comprehensive set of endpoints for managing restaurant operations, including authentication, restaurant details, tables, categories, menu items, orders, reservations, and invoicing.

## Base URL

`https://api-resturant-management.onrender.com/restaurant`

## Authentication Endpoints

### Login

- **POST** `/auth/login`
- Description: Authenticate restaurant user
- Request Body:
  ```json
  {
    "email": "emmanuelaggor.ea@gmail.com",
    "password": "123456789"
  }
  ```

### Update Password

- **PATCH** `/auth/update-password`
- Description: Change default password to a specified password
- Request Body:
  ```json
  {
    "email": "emmanuelaggor.ea@gmail.com",
    "password": "123456789"
  }
  ```

## Restaurant Management Endpoints

### Update Restaurant Details

- **PATCH** `/main/update-restaurant/{restaurantId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "latitude": 6.6726107,
    "longitude": -1.5657602,
    "phone": "0244556679",
    "capacity": 5
  }
  ```

## Table Management

### Create Table

- **POST** `/main/create-table/{restaurantId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "number": 5,
    "capacity": 4
  }
  ```

### Update Table

- **PUT** `/main/update-table/{tableId}`
- Headers: Authorization

### Get Table

- **GET** `/main/get-table`
- Parameters: `restaurantId`, `tableNumber`
- Headers: Authorization

## Category Management

### Create Category

- **POST** `/main/create-category/{restaurantId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "name": "Starter"
  }
  ```

### Update Category

- **PUT** `/main/update-category/{categoryId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "name": "Breakfast"
  }
  ```

### Get All Categories

- **GET** `/main/get-all-categories/{restaurantId}`
- Headers: Authorization
- Response:
  ```json
  {
    "message": "Categories fetched successfully",
    "categories": [
      {
        "id": "",
        "name": "",
        "restaurantId": ""
      }
    ]
  }
  ```

## Menu Item Management

### Create Menu Item

- **POST** `/main/create-menu-item/{restaurantId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "name": "Chocolate Drink",
    "price": 10.99,
    "description": "Hot Chocolate drink",
    "categoryId": "cm48f8b310003exs4cwdyducu"
  }
  ```

### Update Menu Item

- **PUT** `/main/update-menu-item/{menuItemId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "name": "Hausa Koko",
    "price": 20.99,
    "description": "Koko with kose",
    "categoryId": "cm48f8b310003exs4cwdyducu"
  }
  ```

### Delete Menu Item

- **DELETE** `/main/delete-menu-item/{menuItemId}`
- Headers: Authorization

## Order Management

### Get All Orders

- **GET** `/main/get-all-orders/{restaurantId}`
- Headers: Authorization

### Update Order Status

- **PUT** `/main/update-order-status/{orderId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "status": "Processing"
  }
  ```

## Reservation Management

### Add Reservation

- **POST** `/main/add-reservation/{restaurantId}`
- Headers: Authorization
- Request Body:
  ```json
  {
    "name": "John Doe",
    "phone": "0227788888",
    "numberOfGuests": 5,
    "tableId": "cm3yoacbb00019k3i5vcxdv3x",
    "date": "2024-11-30",
    "time": "12:29"
  }
  ```
- Constraints:
  - Date format: "YYYY-MM-DD"
  - Time format: "HH:MM" (24-hour)
  - Number of guests must be ≤ table capacity and ≥ 1

### Get Reservations

- **GET** `/main/get-reservations/{restaurantId}`
- Headers: Authorization

## Invoice Generation

### Generate Invoice

- **POST** `/main/generate-invoice`
- Headers: Authorization
- Request Body:
  ```json
  {
    "orderId": "cm49xbu0w0001exisq5gulebd"
  }
  ```
- Response includes:
  - Message
  - Invoice details (ID, reference, date, status)
  - Total amount
  - Invoice items

## Authentication

- All endpoints require an Authorization header with a Bearer token

## Notes

- Replace placeholders like `{restaurantId}`, `{tableId}`, etc., with actual IDs
- Ensure proper authentication before making requests
