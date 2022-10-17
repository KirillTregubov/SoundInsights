import { useState } from 'react'
// import { format } from 'date-fns'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="App">
      <div>Hello World</div>
      <button onClick={() => setCount(count + 1)}>
        Count is <span className={'tabular-nums'}>{count}</span>
        {/* {format(new Date(), "'Today is a' eeee")} */}
      </button>
    </div>
  )
}

export default App
