import { useCallback, useEffect, useRef, useState } from 'react'


import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [passLength, setPassLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [symbAllowed, setSymbAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxya"
    if (numAllowed) str += "0123456789"
    if (symbAllowed) str+="#$%^&*_=+!~"

    for (let i = pass.length; i <passLength; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [passLength, numAllowed, symbAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [passLength, numAllowed, symbAllowed]) 

  const passwrodRef=useRef(null)

  const copyToClipboard=useCallback(()=>{
    passwrodRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Copied to clipboard")
  },[password])
  return (
    <>
      <div className='h-screen bg-slate-900 flex justify-center items-center '>
        <div className='bg-slate-800 w-3xl px-5 py-10 rounded'>
          <h1 className='text-center text-neutral-50 text-3xl mb-10'>Password Generator</h1>
          <div className='mb-15'>
            <input className='bg-slate-500 text-amber-300 w-full px-3 py-2 rounded text-center text-4xl'
              type="text" name="" id="" disabled placeholder='Password' value={password} />
          </div>

          <div className='bg-slate-700 mt-3 px-4 py-2 rounded'>
            <p className='text-amber-400'>Length:- {passLength}</p>
            <input type="range"
              className='w-full'
              name="" id="" min={8} max={100} value={passLength} onChange={(e) => setPassLength(e.target.value)} ref={passwrodRef}/>
          </div>

          <div className='flex items-center justify-between bg-slate-700 mt-3 px-4 py-2 rounded'>
            <p className='text-amber-400'>Add Number</p>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={() => setNumAllowed((prev) => !prev)} />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-amber-400 transition-all duration-300"></div>
              <div className="absolute ml-1  w-4 h-4 bg-black rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
            </label>

          </div>

          <div className='flex items-center justify-between bg-slate-700 mt-3 px-4 py-2 rounded'>
            <p className='text-amber-400'>Add Symbol</p>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={() => setSymbAllowed((prev) => !prev)} />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-amber-400 transition-all duration-300"></div>
              <div className="absolute ml-1  w-4 h-4 bg-black rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
            </label>
          </div>

          <div className='text-center'>
            <button className='bg-amber-300 font-bold w-50 mt-4 py-3 cursor-pointer'
            onClick={copyToClipboard}>Copy Password</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
