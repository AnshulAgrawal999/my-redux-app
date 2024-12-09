import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className="card">
          count is {count}

        <button onClick={() => setCount((count) => count + 1)}>
          increase count
        </button>

        <button onClick={() => setCount((count) => count - 1)}>
            decrease count
        </button>
        
      </div>

      
    </>
  )
}

export default App
