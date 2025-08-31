import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '1rem' 
        }}>
          Car Cost Calculator
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          color: '#6b7280', 
          marginBottom: '2rem' 
        }}>
          UK Car Ownership Cost Analysis
        </p>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
          padding: '2rem' 
        }}>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Development Server Test - Count: {count}
          </p>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Click to Test ({count})
          </button>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            marginTop: '1rem' 
          }}>
            If you can see this and the button works, React is running correctly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App