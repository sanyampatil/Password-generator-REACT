import React, { useCallback, useEffect, useState ,useRef} from 'react'

function App () {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className=' f-full h-screen flex justify-center item-center'>
      <div className='w-[70%]  h-[70%] mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow ml-20 rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            className='outline-none w-[70%] ml-20 py-3 px-3'
            placeholder='Password'
            value={password}
            readOnly
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2 ml-[15%] mt-20 bg-gray-900 w-[70%] h-[50%] '>
          <div className='flex items-center ml-20 gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              onChange={(e) => {setLength(e.target.value)}}
              className='cursor-pointer'
              value={length}
            />
            <label>Length:  {length} </label>
          </div>
          <div className='flex items-center ml-20 gap-x-1'>
            <input type='checkbox' id='numberInput' 
                defaultChecked={numberAllowed}
                onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' id='characterInput' 
                defaultChecked={numberAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
