"use client"
import React from 'react'
import loader from 'components/LottieFiles/loader.json'
import Lottie from 'lottie-react'

export default function LoaderEffect() {
  return (
    <div className='flex items-center justify-center w-full'>
        <Lottie animationData={loader}/>   
    </div>
  )
}
