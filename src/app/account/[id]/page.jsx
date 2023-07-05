'use client'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'


const accountpage = () => {
  const [fromProfile,setFormProfile] = useState({})
  const pathName = usePathname()
  const api = process.env.API_ENDPOINT;

  useEffect(() =>{
    const regex = /^\/account\/(.+)$/;
    const match = pathName.match(regex);
    const id = match ? match[1] : null;
    
    console.log(id)
    loadData(id)
  }
  
    ,[])
    
    const loadData = async (id) =>
    await axios.get(api+"userdetail/"+id)
    .then((res)=>{
      console.log(res.data)
      setFormProfile(res.data)



    })


const handleSubmit = async(e)=>{

  console.log(fromProfile)

}
const handleChange = (e)=>{ 
    setFormProfile({
        ...fromProfile,
        [e.target.name]: e.target.value

    })
    
}
  return (
    <>

<div  className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div  className="mt-4 sm:mx-auto sm:w-full sm:max-w-3xl">
<div  className="col-10 col-lg-5">     
<form onSubmit={handleSubmit}>
 
  <li>แก้ไขโปรไฟล์</li>
  <div className="max-w-2xl py-2 lg:max-w-none justify-center">
  <div className="relative z-0 w-full mb-6 group  ">
    <input type="email" name="email"  value={fromProfile.email}
    onChange={(e) => handleChange(e)} 
    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="floating_email" 
    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
 
 
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
      <input type="text" name="nickname"  value={fromProfile.nickname}
      onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">NickName</label>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input type="text" name="floating_last_name" id="floating_last_name" onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-6 group">
      <input type="file" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="file" id="file" onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> อัพโหลดรูปภาพ</label>
    </div>
    
    
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</div>
</form>
</div>
</div>
</div>

    </>
  )
}

export default accountpage