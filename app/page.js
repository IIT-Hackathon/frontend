"use client"
import Image from 'next/image'
import Lottie from 'lottie-react'
import landing from '@/components/LottieFiles/landing.json'

import Link from 'next/link'
import Hero from '../components/Hero'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Calculator from '@/components/Calculator'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    if(window) {
      let token = localStorage.getItem("token")
      token = JSON.parse(token)
      if(token != null) {
        if(token.role == 'DOCTOR') {
          router.push(`/doctor_dashboard/${token.id}`)
        }
        else if(token.role == 'HOSPITAL') {
          router.push(`/hospital_dashboard/${token.id}`)
        }
      }
    }
  }, [])
  return (
    <main className="min-h-screen">
      <nav className='sticky z-50 bg-white'>
        <Hero landing = {true} />
      </nav>
        <section className='min-h-screen flex items-center'>
          <div className='flex w-full justify-between items-center p-16'>
            <div className='max-w-[644px]'>
              <h1  className={`tracking-widest text-black text-6xl bg-clip-text p-6`}>TaxWizard</h1>
              <h1 className={`text-4xl font-bold bg-gradient-to-r from-[#2a393f] via-[#1d0d30] to-[#532369] bg-clip-text text-transparent p-6`}>HealthCare, More Accessible Than Ever!</h1>
              <h3 className='text-xl px-6 tracking-wide leading-7'>Welcome to our revolutionary healthcare platform, where Cutting-Edge Technology meets Compassionate Care. We believe in reimagining the way healthcare is delivered.Our team of expert doctors and healthcare professionals is dedicated to providing you with personalized and exceptional care.</h3>
              <div className='flex space-x-6 p-6 items-center'>
                <h1 className='text-xl underline'>Discover your path to optimal health : </h1>
                <button className='bg-black text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out'><Link href="/signup">JOIN US</Link></button>
              </div>
            </div>
            <Lottie className='w-[40%] h-[50%] mr-32' animationData={landing} />
          </div>
        </section>
    </main>
  )
}


