import React, { useState } from 'react'
import { Button } from './ui/button'

export default function Calculator() {
    const [number, setNumber] = useState(0)


  function add() {
    setNumber(number => number + 1) 
  }
  function subtract() {
    setNumber(number => number - 1) 
  }

  return (
    <div className='flex w-full flex-col items-center'>
        <h1 data-testid="number" className='text-6xl justify-center py-4 my-8 flex w-full'>{number}</h1>
        <div className='flex my-4 space-x-4'>
            <Button onClick={add} >Add</Button>
            <Button onClick={subtract} >Subtract</Button>
        </div>
    </div>
  )
}
