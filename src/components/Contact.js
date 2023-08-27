"use client"
import { Link } from '@mui/material'
import React from 'react'

const Contact = () => {
  return (
  
<div className=" font-sans h-screen w-full flex flex-row justify-center items-center">
  <div className="card w-96 mx-auto bg-slate-400  shadow-xl hover:shadow border-spacing-8 contacts mb-60">
    <img className="w-32 mx-auto rounded-full -mt-20 border-8 bg-slate-400" src="https://media.discordapp.net/attachments/1072141066444214302/1144625520735158332/3F4FD05E-B7E2-4BF1-BEAC-838B0098D8B2.jpg?width=601&height=585" alt />
    <div className="text-center mt-2 text-3xl font-medium">นันธวัช อินธิแสน</div>
    <div className="text-center mt-2 font-light text-sm">@wavekungs</div>
    <div className="text-center font-normal text-lg">Developer</div>
    <div className="px-6 text-center mt-2 font-light text-sm">
      <p>
        ช่องทางติดต่อสอบถาม
      </p>
    </div>
    <hr className="mt-8" />
    <div className="flex p-4">
      <button className="w-1/2 text-center bg-blue-600">
        <Link href='https://www.facebook.com/wavekungking/' className="font-bold text-cyan-50">FB ติดต่อ</Link> 
      </button>
      <div className="w-1 border border-gray-300">
      </div>
      <button className="w-1/2 text-center bg-green-500">
        <span className="font-bold text-cyan-50">LINE ติดต่อ</span> 
      </button>
  </div>
  </div>
  <div className="card w-96 mx-auto bg-slate-400  shadow-xl border-spacing-8 hover:shadow contacts mb-60">
    <img className="w-32 mx-auto rounded-full -mt-20 border-8 bg-slate-400" src="https://cdn.discordapp.com/attachments/1072141066444214302/1144677259526033419/125867616_193722205664352_1890428507392746912_n.jpg" alt />
    <div className="text-center mt-2 text-3xl font-medium">ธรรมรัตน์ หอมกลาง</div>
    <div className="text-center mt-2 font-light text-sm">@Rassie</div>
    <div className="text-center font-normal text-lg">Support</div>
    <div className="px-6 text-center mt-2 font-light text-sm">
      <p>
        ช่องทางติดต่อสอบถาม
      </p>
    </div>
    <hr className="mt-8" />
    <div className="flex p-4">
      <button className="w-1/2 text-center bg-blue-600">
        <Link href='https://www.facebook.com/wavekungking/' className="font-bold text-cyan-50">FB ติดต่อ</Link> 
      </button>
      <div className="w-1 border border-gray-300">
      </div>
      <button className="w-1/2 text-center bg-green-500">
        <span className="font-bold text-cyan-50">LINE ติดต่อ</span> 
      </button>
  </div>
  </div>
</div>



  )
}

export default Contact