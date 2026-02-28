import os
from langchain_community.document_loaders import PyPDFLoader, CSVLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

VECTOR_DB_PATH = "data/faiss_index"

class RAGService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        self.vector_store = None
        self._load_or_create_index()

    def _load_or_create_index(self):
        if os.path.exists(VECTOR_DB_PATH):
            try:
                self.vector_store = FAISS.load_local(VECTOR_DB_PATH, self.embeddings, allow_dangerous_deserialization=True)
                print("Loaded existing FAISS index.")
            except Exception as e:
                print(f"Error loading index: {e}")
                self._create_empty_index()
        else:
            self._create_empty_index()

    def _create_empty_index(self):
        # Create an empty index with a dummy document so FAISS initializes correctly
        self.vector_store = FAISS.from_texts(["Init"], self.embeddings)
        self.vector_store.save_local(VECTOR_DB_PATH)
        print("Created empty FAISS index.")

    def process_file_and_index(self, file_path: str):
        print(f"Processing {file_path}")
        if file_path.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
        elif file_path.endswith(".csv"):
            loader = CSVLoader(file_path)
        elif file_path.endswith(".txt"):
            loader = TextLoader(file_path)
        else:
            raise ValueError("Unsupported file type")
            
        docs = loader.load()
        chunks = self.text_splitter.split_documents(docs)
        
        self.vector_store.add_documents(chunks)
        self.vector_store.save_local(VECTOR_DB_PATH)
        return len(chunks)

    def get_retriever(self):
        return self.vector_store.as_retriever(search_kwargs={"k": 3})

rag_service = RAGService()
