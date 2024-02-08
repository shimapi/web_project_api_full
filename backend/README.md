# Backend

This directory contains the backend code for the project. It includes files for routes, controllers, models, middlewares, and utilities.

## Tech Stack

- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Security**: bcryptjs for password hashing
- **Validation**: celebrate for request validation
- **Middleware**: cors for cross-origin resource sharing
- **Environment Variables**: dotenv for managing environment variables

## File Structure

- `app.js`: Main entry point for the Express application.
- `controllers/`: Contains controller functions for users and cards.
- `middlewares/`: Includes middleware functions for request logging, error handling, and authorization.
- `models/`: Defines Mongoose schemas for users and cards.
- `routes/`: Defines routes for users and cards.

## Dependencies

The backend relies on various npm packages such as Express, Mongoose, bcryptjs, celebrate, cors, dotenv, and more. These dependencies are listed in the `package.json` file.

## Configuration

- `.editorconfig`: Contains configuration settings for code editors.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `.eslintrc.js`: Configuration file for ESLint with specific rules for the project.
