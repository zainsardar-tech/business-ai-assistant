# Business AI Assistant

A modular, production-ready AI assistant designed for enterprise workflows. This system leverages Large Language Models and Retrieval-Augmented Generation (RAG) to help users chat with company documents, summarize analytics, and perform dynamic automated tasks like inventory querying.

## Core Features
- **Intelligent RAG Pipeline**: Upload PDFs, CSVs, and TXTs. Extracts knowledge into a FAISS vector database.
- **AI Business Agent**: Conversational interface powered by LangChain enabling multi-turn memory and tool execution.
- **Actionable Insights / Tools**: Connects securely to backend inventory and sales databases to execute business actions.
- **Premium User Interface**: Built with React, Tailwind CSS, and Recharts for a dynamic, stunning glassmorphism dashboard.
- **Enterprise Security**: JWT-based stateless authentication and user-scoped data segregation.

## Tech Stack
* **Backend:** Python 3.11, FastAPI, LangChain, OpenAI API
* **Database:** PostgreSQL (SQLAlchemy ORM), FAISS (Vector Store)
* **Frontend:** React, Vite, TailwindCSS, Recharts
* **DevOps:** Docker, Docker Compose, GitHub Actions CI/CD

## Setup Instructions (Local Deployment)

### Prerequisites
* Docker and Docker Compose
* An OpenAI API Key

### 1. Clone the repository
```bash
git clone https://github.com/username/business-ai-assistant.git
cd business-ai-assistant
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start the application
```bash
docker-compose up -d --build
```

### 4. Access the Application
* **Frontend Dashboard**: [http://localhost](http://localhost) (or port 80 based on standard setup)
* **API Documentation (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Cloud Deployment (AWS)
This repository includes a CI/CD pipeline using GitHub Actions (`.github/workflows/deploy.yml`) bridging to an AWS EC2 instance. Ensure the following GitHub Secrets are set:
- `SSH_PRIVATE_KEY`
- `EC2_HOST`

Run `scripts/deploy.sh` for manual pulling and updating on the server.

## Contribution Guidelines
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
>>>>>>> fb83601 (Initial commit: Business AI Assistant project structure)
