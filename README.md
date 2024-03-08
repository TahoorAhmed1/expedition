# Backend Application Readme

Welcome to the README for our backend application. This document provides an overview of the project, its folder structure, and important information for developers working on or setting up the application.

## Technology Stack

- **Language:** Node.js
- **Web Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma

## Folder Structure

The backend application is organized into the following folder structure:

- `server.js`: This is the main entry point for the backend server.
- `app.js`: The core application file where we configure middleware, routes, and start the server using the Express web framework.
- `.env.dev`: Environment configuration file for the development environment. Used during the development phase to facilitate debugging and local development.
- `.env.qa`: Environment configuration file for the quality assurance (QA) environment. Used for testing and quality control before deployment to production.
- `.env.stage`: Environment configuration file for the staging environment, used to test the application before deployment to production. This environment helps catch and resolve issues before they impact the main production setup.
- `.env`: Environment configuration file for the main production environment.

### Project Folders

- `routes`: This folder contains route definitions for the API endpoints. It's where you define the available routes and their associated controller methods.
- `controllers`: Here, you'll find the controller logic for handling API requests. Controllers define the behavior of each API endpoint.
- `repository`: This is where you'll find database interaction code, connecting to and querying the PostgreSQL database using Prisma. The repository folder handles the data access and communication with the database.
- `dto`: Data Transfer Objects (DTOs) may be stored here, representing data structures for communication between the client and server. They help maintain a clear and consistent data contract.
- `helpers`: Utility functions and helper modules that are shared across multiple projects. These can include functions that are reused in various parts of the application.
- `utils`: General utility functions specific to this project. These utility functions serve the specific needs of this application.
- `validations`: This folder can be used to store validation logic and schemas for input data, which is especially important for API request validation.
- `middleware`: Middleware functions can be stored here. Middleware can be used for tasks such as authentication, logging, error handling, and more. It's a flexible way to add functionality to your API routes.
- `public`: application serves static assets (e.g., images, stylesheets, or client-side JavaScript), you can place them in this folder.
- `scripts`: Contains utility scripts for automating various development and maintenance tasks in project.
- `prisma`: Stores Prisma-related files and configurations for managing database.
- `documentation`: Houses project documentation, including database ERD, and API documentation.
- `data`: Holds data-related assets such as seed data, data fixtures, and other data-related files used in application.
- `config`: Stores configuration files that are used throughout your application, including database configurations.

## Getting Started

To get started with the backend application, follow these steps:

1. Clone the repository to your local development environment.
2. Install the required dependencies using `npm install`.
3. Configure the environment variables according to the specific environment you are working on (`.env`, `.env.qa`, `.env.dev`, `.env.stage`).
4. Run the application locally using `npm start` or your preferred method. Make sure the server is up and running.

# Coding Guidelines

The following coding guidelines are intended to ensure consistency, readability, and maintainability of the codebase for our backend application. Adhering to these guidelines will make it easier for team members to work together and maintain the codebase.

## General Principles

- Write code that is easy to read and understand. Code should be self-explanatory, reducing the need for extensive comments.
- Follow the DRY (Don't Repeat Yourself) principle. Reusable code should be placed in functions or modules rather than duplicated.
- Use meaningful and descriptive variable and function names. Avoid single-letter variables or cryptic names.
- Break code into smaller, focused functions with well-defined responsibilities. Each function should have a single purpose or task.

## JavaScript and Node.js

- Use modern JavaScript (ES6 and beyond) features where applicable.
- Use `const` for variables that should not be re-assigned, and `let` when re-assignment is necessary.
- Avoid using `var`.
- Use arrow functions for concise, anonymous functions.
- Use `async/await` for handling asynchronous operations.
- Ensure error handling is in place, using try/catch blocks or handling Promise rejections.
