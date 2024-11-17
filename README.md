# Assignment Submission Portal

This project is a backend system that allows users to upload assignments, which are managed by admins. Users and admins authenticate via JWT (JSON Web Token), and the data is stored in a MongoDB database.

## Features

- User Registration and Login
- Admin Registration and Login
- Uploading Assignments (by users)
- Admins can view, accept, and reject assignments
- Token-based Authentication with JWT

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
3. [Running the Project](#running-the-project)
4. [API Endpoints](#api-endpoints)
5. [Error Handling](#error-handling)
6. [License](#license)

---

## Technologies Used

- **Node.js** - JavaScript runtime used to run the server.
- **Express** - Web framework to build the API.
- **MongoDB** - NoSQL database for storing user and assignment data.
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Token)** - For authentication and authorization of users and admins.
- **Bcrypt.js** - For securely hashing user passwords.
- **dotenv** - To manage environment variables.

---

## Project Setup

### Prerequisites

Before you can run this project, make sure you have the following installed:

- **Node.js**
- **MongoDB** (either locally or via MongoDB Atlas)
- **Postman** (for testing the API endpoints)

### Clone the Repository

Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/assignment-submission-portal.git
   ```

### Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

---

### Running the project

### Environment variables

Create a .env file in the root directory of the project and add the following environment variables:

```bash
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=your-mongo-db-uri
```

Start the server

```bash
npm start
```

---

## API Endpoints

Here’s a list of the available API endpoints:

---

### **User Endpoints** (`/api/users`)

- **POST** `/register`: Register a new user  
  - **Request Body**:  
    ```json
    {
        "username": "your-username",
        "email": "your-email",
        "password": "your-password"
    }
    ```
  - **Response**:  
    ```json
    {
        "message": "User successfully registered"
    }
    ```

- **POST** `/login`: Login a user and get a JWT token  
  - **Request Body**:  
    ```json
    {
        "email": "your-email",
        "password": "your-password"
    }
    ```
  - **Response**:  
    ```json
    {
        "token": "your-jwt-token"
    }
    ```

- **POST** `/upload`: Upload an assignment (**Protected Route**)  
  - **Headers**:  
    `Authorization: Bearer {JWT token}`
  - **Request Body**:  
    ```json
    {
        "task": "your-task-details",
        "adminId": "admin-id"
    }
    ```
  - **Response**:  
    ```json
    {
        "message": "Assignment uploaded successfully"
    }
    ```

- **POST** `/admins`: Fetch all admins  
  - **Headers**:  
    `Authorization: Bearer {JWT token}`
  - **Response**:  
    ```json
    [
        {
            "id": "admin-id",
            "username": "admin-username",
            "email": "admin-email"
        }
    ]
    ```

---

### **Admin Endpoints** (`/api/admin`)

- **POST** `/register`: Register a new admin  
  - **Request Body**:  
    ```json
    {
        "username": "admin-username",
        "email": "admin-email",
        "password": "admin-password"
    }
    ```
  - **Response**:  
    ```json
    {
        "message": "Admin successfully registered"
    }
    ```

- **POST** `/login`: Login an admin and get a JWT token  
  - **Request Body**:  
    ```json
    {
        "email": "admin-email",
        "password": "admin-password"
    }
    ```
  - **Response**:  
    ```json
    {
        "token": "admin-jwt-token"
    }
    ```

- **GET** `/assignments`: View all assignments tagged to the admin (**Protected Route**)  
  - **Headers**:  
    `Authorization: Bearer {JWT token}`
  - **Response**:  
    ```json
    [
        {
            "id": "assignment-id",
            "task": "task-details",
            "status": "pending/accepted/rejected"
        }
    ]
    ```

- **POST** `/assignments/:id/accept`: Accept an assignment (**Protected Route**)  
  - **Headers**:  
    `Authorization: Bearer {JWT token}`
  - **Response**:  
    ```json
    {
        "message": "Assignment accepted"
    }
    ```

- **POST** `/assignments/:id/reject`: Reject an assignment (**Protected Route**)  
  - **Headers**:  
    `Authorization: Bearer {JWT token}`
  - **Response**:  
    ```json
    {
        "message": "Assignment rejected"
    }
    ```

---


## Error Handling

### Common Error Responses

- **400 Bad Request**: Missing required fields or invalid request data.
- **401 Unauthorized**: Missing or invalid JWT token.
- **404 Not Found**: Resource not found (e.g., user or admin).
- **500 Internal Server Error**: Something went wrong on the server side.

---

## License

This project is licensed under the **MIT License**.  

---









