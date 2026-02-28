# Architecture Documentation

## System Topology
The system is composed of three primary Docker containers orchestrated via `docker-compose`:
1. **Frontend**: Nginx container serving static complied React/Vite assets.
2. **Backend**: Uvicorn container serving the FastAPI REST API.
3. **Database**: PostgreSQL database holding structured data.

## RAG & Vector Flow
- **Ingestion**: Documents are uploaded via `/api/v1/documents/upload`. They are chunked using LangChain's `RecursiveCharacterTextSplitter` and embedded via `OpenAIEmbeddings`. Instead of an external vector DB initially, we use **FAISS** with local volume persistence for simplicity and speed.
- **Retrieval**: User queries routed to `/api/v1/agent/chat` are sent to a `create_tool_calling_agent`. The agent determines whether to route the query to standard tools (like inventory queries mapped to CSV/SQL) or to the Retriever tool for context synthesis.

## Security Model
- **Authentication**: OAuth2 with Password payload flow.
- **Authorization**: Bearer JWT tokens attached to frontend interceptors. Tokens have expiration metadata enforcing re-authentication.
- **Storage**: Environment secrets injected dynamically via docker environment bounds mapped to Pydantic BaseSettings.
