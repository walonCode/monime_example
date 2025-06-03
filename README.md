# Learning Monime

This project is a comprehensive demonstration of a backend service built using TypeScript with Express.js, Mongoose, and other libraries. It includes modules for user authentication, payment processing, and various utility functions. It is designed to serve as a learning example for setting up a project with `monime` in TypeScript.

## Features

- User Authentication (Registration, Login, etc.)
- Payment Processing
- CORS management
- Middleware for Authentication
- Database models for user and payment operations

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/walonCode/monime_example.git
    cd learning_docker
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Create a `.env` file in the root of your project with necessary environment variables. Use the `.env.example` template provided in the repository.
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    MONIME_SPACE_ID=your-monime-space-id
    TOKEN=access-token-from-monime
    ```

2. Build the project:
    ```bash
    npm run build
    ```

3. Start the application:
    ```bash
    npm start
    ```

4. To start the application using nodemon for hot-reloading:
    ```bash
    npm run dev
    ```

## Technologies & Tools

![TypeScript](https://github.com/marcfromspace/.github/raw/main/icons/typescript.svg)
![Nodejs](https://github.com/marcfromspace/.github/raw/main/icons/nodejs.svg)
![Express](https://github.com/marcfromspace/.github/raw/main/icons/express.svg)
![MongoDB](https://github.com/marcfromspace/.github/raw/main/icons/mongodb.svg)

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **TypeScript**: Superset of JavaScript
- **Mongoose**: MongoDB object modeling tool
- **Bcrypt**: Library for password hashing
- **JSON Web Token**: Authentication mechanism
- **Axios**: Promise-based HTTP client

## Folder Structure
```plaintext
.
├── .env
├── .gitignore
├── nodemon.json
├── package-lock.json
├── package.json
├── src
|  ├── configs
|  |  ├── connectDB.ts
|  |  ├── corsOptions.ts
|  ├── controllers
|  |  ├── paymentController.ts
|  |  ├── userController.ts
|  ├── index.ts
|  ├── middleware
|  |  ├── authMiddleware.ts
|  ├── models
|  |  ├── paymentModel.ts
|  |  ├── userModel.ts
|  ├── routes
|  |  ├── paymentRoute.ts
|  |  ├── userRoute.ts
|  ├── types
|  |  ├── express
|  |  |  ├── index.d.ts
|  |  ├── type.ts
|  ├── utils
|  |  ├── generatePayment.ts
├── tsconfig.json
```

## Authors

**Name**: [walonCode](https://github.com/walonCode)

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

Please note this is a learning project and should be used as a reference for testing with the monime payment api and is not production-ready.

---

We are constantly improving the code experience!