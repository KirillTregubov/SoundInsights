import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="App">
      <div>Hello World</div>
      <button onClick={() => setCount(count + 1)}>
        Count is <span className={'tabular-nums'}>{count}</span>
      </button>
    </div>
  )
}

export default App
