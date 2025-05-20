import { NextResponse } from 'next/server'

// Store chat history in memory (in a real app, you'd want to use a database)
const chatHistories = new Map<string, any[]>()

// Python backend URL
const PYTHON_BACKEND_URL = 'http://localhost:8501'

// Check if Python backend is healthy
async function checkBackendHealth() {
  try {
    const response = await fetch(`${PYTHON_BACKEND_URL}/health`)
    return response.ok
  } catch (error) {
    console.error('Backend health check failed:', error)
    return false
  }
}

export async function POST(req: Request) {
  try {
    // Check if backend is healthy
    const isHealthy = await checkBackendHealth()
    if (!isHealthy) {
      throw new Error('Python backend is not responding. Please make sure it is running on port 8501.')
    }

    const { message, sessionId = 'default' } = await req.json()
    console.log('Received message:', message)
    console.log('Session ID:', sessionId)

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Forward the request to the Python backend
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId,
        chat_history: chatHistories.get(sessionId) || [],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        `Failed to get response from Python backend: ${errorData.detail || response.statusText}`
      )
    }

    const data = await response.json()

    // Update chat history
    if (!chatHistories.has(sessionId)) {
      chatHistories.set(sessionId, [])
    }
    const history = chatHistories.get(sessionId)!
    history.push({ role: 'user', content: message })
    history.push({ role: 'assistant', content: data.response })

    return NextResponse.json({ response: data.response })
  } catch (error) {
    console.error('Detailed error in chat API:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to process chat request',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
