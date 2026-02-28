# API Documentation

The REST API is built with FastAPI. Complete documentation and interactive testing are available at `/docs` (Swagger UI) when the application is running.

## Major Endpoints

### Auth
- `POST /api/v1/auth/login` - Exchange credentials for a JWT.
- `POST /api/v1/auth/register` - Register a new user account.

### Agent
- `POST /api/v1/agent/chat` - Interact with the AI Language Model.
  - **Body**: `{"query": "string", "chat_history": []}`
  - **Response**: `{"response": "string"}`

### Documents
- `GET /api/v1/documents/` - Fetch all documents uploaded by the user.
- `POST /api/v1/documents/upload` - Upload `multipart/form-data` containing a `file`.

### Analytics
- `GET /api/v1/analytics/` - Retrieve dashboard telemetry payload.
