# API Reference (local copy)

This document lists the main API endpoints the mobile app expects. Keep this file in sync with backend changes.

## Base URL
- The app expects the API base URL to be set in `src/config/api.ts` as `API_CONFIG.BASE_URL`.
- IMPORTANT: When running the backend locally, set the API URL to your machine's IPv4 address (e.g. `http://192.168.1.100:8000/api`). See README.md for details.

## Auth
- POST `/login` - body: { email, password } -> returns `{ user, token }`
- POST `/logout` - invalidate token
- GET `/user` - returns current user (requires Authorization header)

## Trips
- GET `/trips` - list trips
- GET `/trips/:id` - trip details
- POST `/trips` - create trip
- PUT `/trips/:id` - update trip
- DELETE `/trips/:id` - delete trip

## Vehicles
- GET `/vehicles` - list vehicles
- GET `/vehicles/:id` - vehicle details
- POST `/vehicles` - create vehicle
- PUT `/vehicles/:id` - update vehicle
- DELETE `/vehicles/:id` - delete vehicle

## Users
- GET `/users` - list users
- POST `/users` - create user
- PUT `/users/:id` - update user
- DELETE `/users/:id` - delete user

> Note: This is a minimal reference. For full API docs, maintain an OpenAPI/Swagger spec in the backend and export JSON here.
