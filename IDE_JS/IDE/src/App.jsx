import { useState } from 'react'
import { Button, Textarea } from './componentes'

function App() {
  const [count, setCount] = useState("")

  function Clear() {
    document.querySelector("textarea").value = "";
    setCount("");
  }

  async function runCode() {

    try {
      var result = eval(count);
      // npx tailwindcss init -p
      // npm install -D tailwindcss@3.4.10 postcss@8.4.41 autoprefixer@10.4.20
      // npm create vite@5.5.2
      // ensenar el resultado del codigo executado

    } catch (error) {
      alert("ERRO \n" + error)
    }
  }
  return (
    <div className="h-screen w-screen justify-center  " >
      <div className="space-y-4 space-x-4 text-center" >
        <h1 className='font-bold ' >IDE ONLINE</h1>
        <Textarea value={count} onChange={(e) => { setCount(e.target.value) }} > Insira o codigo</Textarea>
        <br />
        <Button onClick={() => {
          runCode()
        }} >Run</Button>
        <Button onClick={() => {
          Clear()
        }} >Clear</Button>
        <Button>Download</Button>
      </div>
    </div>
  )
}

export default App
