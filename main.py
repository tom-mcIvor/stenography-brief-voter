from langchain_core.messages import AIMessage, HumanMessage
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Check for required environment variables
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY environment variable is not set")

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize chat model
try:
    llm = ChatOpenAI(
        model="gpt-3.5-turbo",
        temperature=0,
    )
    logger.info("Chat model initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize chat model: {str(e)}")
    raise

# Set up prompt template with conversation memory
prompt = ChatPromptTemplate.from_messages([
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])

# Create the chain
chain = prompt | llm

# Store chat history
chat_histories = {}

@app.post("/api/chat")
async def chat(request: Request):
    try:
        data = await request.json()
        logger.info(f"Received request data: {data}")
        
        message = data.get("message")
        session_id = data.get("sessionId", "default")
        chat_history = data.get("chat_history", [])

        if not message:
            raise HTTPException(status_code=400, detail="Message is required")

        # Convert chat history to LangChain messages
        messages = []
        for msg in chat_history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                messages.append(AIMessage(content=msg["content"]))

        # Get AI response
        response = chain.invoke({
            "chat_history": messages,
            "input": message
        })

        logger.info(f"Generated response for session {session_id}")
        return {"response": response.content}
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

def main():
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8501)

if __name__ == "__main__":
    main()
