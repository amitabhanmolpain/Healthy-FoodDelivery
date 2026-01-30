# Mock API Stubs for PurePlate

This document outlines the mock API endpoints provided in `src/services/api.js`. 
To connect a real backend, ensure your endpoints match these signatures.

## Base Configuration
Currently configured in `src/services/api.js`:
`const API_BASE_URL = "http://localhost:3000/api";`

## Endpoints

### Auth
`POST /api/auth/login`
- Body: `{ email, password }`
- Response: `{ user: UserObject, token: String }`

`POST /api/auth/register`
- Body: `{ email, password, name, ... }`
- Response: `{ user: UserObject, token: String }`

### Meals
`GET /api/meals`
- Query Params: `?category=vegan&search=quinoa`
- Response: `[ MealObject, ... ]`

`GET /api/meals/:slug`
- Response: `MealObject`

### Orders
`POST /api/orders`
- Body: `{ items: CartItem[], total: Number, address: String }`
- Response: `{ id: String, status: String, ... }`

## Data Models

**Meal Object Structure:**
\`\`\`json
{
  "id": "1",
  "name": "Super Green Quinoa Bowl",
  "price": 14.99,
  "calories": 450,
  "badges": ["Zero-Adulteration"],
  "ingredients": [
    { "name": "Spinach", "origin": "Salinas Valley, CA" }
  ],
  "labReportId": "LAB-8821"
}
