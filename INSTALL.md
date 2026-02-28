# Installation Guide

This guide provides detailed instructions on how to install and run the Business AI Assistant locally.

## System Prerequisites
Ensure you have the following installed on your machine:
- **Git**: For version control.
- **Docker**: For containerising the application.
- **Docker Compose**: For orchestrating the multi-container setup.

*Note: You do not need Python or Node.js installed locally on your machine since everything runs inside Docker containers.*

## Step-by-Step Installation

### 1. Clone the Repository
First, clone the source code to your local machine:
```bash
git clone https://github.com/username/business-ai-assistant.git
cd business-ai-assistant
```

### 2. Configure Environment Variables
You need an OpenAI API key to power the LangChain agent and RAG pipeline.

Create a `.env` file in the root directory:
```bash
touch .env
```

Add your API key to the `.env` file:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```
*Optional variables list (already handled securely via default fallbacks for dev):*
- `SECRET_KEY` - JWT signing key.
- `POSTGRES_USER` - Database user.
- `POSTGRES_PASSWORD` - Database password.

### 3. Build and Start the Containers
Use Docker Compose to build the images and start the services in detached mode:
```bash
docker-compose up -d --build
```
This command will spin up three containers:
- `business_assistant_db` (PostgreSQL Database on port 5432)
- `business_assistant_backend` (FastAPI + LangChain Backend on port 8000)
- `business_assistant_frontend` (React + Vite Frontend mapped to port 80)

### 4. Application Verification
Once the containers are successfully running, you can access the platform:

- **Frontend Application**: Open your browser and navigate to [http://localhost](http://localhost)
- **API Swagger Documentation**: Open your browser and navigate to [http://localhost:8000/docs](http://localhost:8000/docs)

### Stopping the Servers
To stop the application, run:
```bash
docker-compose down
```
If you want to clear the database data and vector embeddings, run:
```bash
docker-compose down -v
```

## Troubleshooting
- **Port Conflict**: If port `80` or `8000` is already in use, edit the `ports` mapping in `docker-compose.yml` to use an alternative port (e.g., `"8080:80"` and `"8001:8000"`).
- **Network Issues**: Ensure Docker Engine has internet access to pull the base images and npm dependencies.
