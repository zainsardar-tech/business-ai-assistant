from typing import Any
from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools.retriever import create_retriever_tool
from langchain.tools import tool
import pandas as pd
import json

from backend.services.rag_service import rag_service

@tool
def query_inventory(product_name: str) -> str:
    """Useful to query the inventory for a specific product and return its status and stock count."""
    try:
        df = pd.read_csv("data/sample_inventory.csv")
        product = df[df["product"].str.contains(product_name, case=False, na=False)]
        if product.empty:
            return "Product not found in inventory."
        return product.to_dict(orient="records")[0]
    except Exception as e:
        return f"Could not queries inventory: {e}"

@tool
def generate_sales_report(category: str) -> str:
    """Useful to generate a dummy sales report based on category."""
    return f"Sales for {category} in the last 30 days: $45,000. Trend: UP 15%."

class BusinessAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
        
        retriever = rag_service.get_retriever()
        retriever_tool = create_retriever_tool(
            retriever,
            "company_documents_retriever",
            "Searches and returns excerpts from the company's uploaded documents."
        )
        
        self.tools = [retriever_tool, query_inventory, generate_sales_report]
        
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a professional, business-savvy AI assistant. "
                       "You help users make actionable decisions based on data. "
                       "Provide concise, accurate recommendations."),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        self.agent = create_tool_calling_agent(self.llm, self.tools, self.prompt)
        self.agent_executor = AgentExecutor(agent=self.agent, tools=self.tools, verbose=True)

    def invoke(self, query: str, chat_history: list = []) -> str:
        # chat_history format: [("human", "hello"), ("ai", "hi")]
        response = self.agent_executor.invoke({
            "input": query, 
            "chat_history": chat_history
        })
        return response["output"]

agent_service = BusinessAgent()
