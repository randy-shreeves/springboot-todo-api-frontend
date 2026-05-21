# Task Manager Frontend

Frontend client for a basic task management system built with React and JavaScript.

## Tech Stack

- JavaScript
- React
- React Router
- Vercel
- GitHub Actions

## Features

- User login
- User registration
- Task dashboard page
- JWT authentication
- Protected frontend routes
- Local storage token persistence
- CI checks with GitHub Actions
- Deployment with Vercel

## Pages

### `/login`
Allows existing users to authenticate with the backend API.

### `/register`
Allows new users to create an account.

### `/dashboard`
Main authenticated area of the application. Enables user to perform basic CRUD operations for tasks.

## Authentication

Authentication is handled by the backend API using JWTs.
The frontend stores the JWT in the browser's `localStorage` and includes it in authenticated API requests.

## CI/CD

GitHub Actions is used to run CI checks

## Deployment

Deployed on Vercel.
Live link: https://springboot-todo-api-frontend.vercel.app/

## Backend

This application connects to a separate backend API that handles authentication, JWT generation/validation, and task management logic. Repo:
https://github.com/randy-shreeves/springboot-todo-api