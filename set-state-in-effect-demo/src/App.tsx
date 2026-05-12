import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState(0);
  const userText = input === 0 ? "No number is set" : `You picked ${input}`;

  return (
    <>
   <h1>Set state in effect demo</h1>

<div style={{display: 'flex'}}>
  <label htmlFor="number-picker">Pick a number:</label>
   <input id="number-picker" type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} />
</div>


   <h2>{userText}</h2>
    </>
  )
}

export default App
