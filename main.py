import streamlit as st
from langchain_core.messages import AIMessage, HumanMessage
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


def main():
    load_dotenv()
    st.title("Simple Chatbot")
    st.caption("🚀 A chatbot for AICE")

    # Initialize chat model
    llm = ChatOpenAI(
        model="gpt-3.5-turbo",  # or "gpt-4" for GPT-4
        temperature=0,
    )

    # Set up prompt template with conversation memory
    prompt = ChatPromptTemplate.from_messages([
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}")
    ])

    # Create the chain
    chain = prompt | llm

    # Initialize chat history
    if "messages" not in st.session_state:
        st.session_state.messages = [AIMessage(content="How can I help you?")]
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    # Display chat messages
    for message in st.session_state.chat_history:
        if isinstance(message, AIMessage):
            with st.chat_message("assistant"):
                st.write(message.content)
        elif isinstance(message, HumanMessage):
            with st.chat_message("user"):
                st.write(message.content)

    # Chat input
    if user_input := st.chat_input("Type your message..."):
        # Add user message to history
        st.session_state.chat_history.append(HumanMessage(content=user_input))
        with st.chat_message("user"):
            st.write(user_input)

        # Get AI response
        with st.chat_message("assistant"):
            response = chain.invoke({
                "chat_history": st.session_state.chat_history,
                "input": user_input
            })
            st.write(response.content)
            st.session_state.chat_history.append(response)


if __name__ == "__main__":
    main()
