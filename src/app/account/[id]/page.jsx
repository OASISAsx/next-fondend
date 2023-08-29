'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'


const accountpage = ({ user }) => {
  const [fromProfile, setFormProfile] = useState({})
  const [imageFile, setImageFile] = useState([])

  const { data: session } = useSession()
  // console.log("🚀 ~ file: page.jsx:14 ~ addproduct ~ imageFile:", imageFile)
  const [imageUrl, setImageUrl] = useState([])
  const [userAvatar, setUserAvatar] = useState(null);
  // const myInt = parseInt(id, 10);

  console.log("🚀 ~ file: page.jsx:10 ~ accountpage ~ fromProfile:", fromProfile)
  const { id } = useParams();
  console.log("🚀 ~ file: page.jsx:12 ~ accountpage ~ id:", id)

  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    if (session?.user?.userid) {
      // เรียก API userdetail เพื่อรับข้อมูล Avatar
      axios.get(`${api}userdetail/${session.user.userid}`)
        .then(response => {
          // นำข้อมูล Avatar จาก response มาใส่ใน state
          setUserAvatar(response.data.Avatar);
        })
        .catch(error => {
          console.error('Error fetching user avatar:', error);
        });
    }

    loadData(id);
  }

    , [api, session?.user?.userid])

  const loadData = async (id) => {
    await axios.get(api + "userdetail/" + id)
      .then((res) => {
        // console.log(res.data)

        setFormProfile(res.data)




      })

  }

  const handleSubmit = async (e) => {

    Swal.fire({
      title: 'กำลังทำรายการ',
      html: '<button className="btn btn-primary" type="button" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>',
      showConfirmButton: false,
      allowOutsideClick: false,
    })
    e.preventDefault();
    if (imageUrl.length < 2) {
      const postData = await fetch(api + "userdetail/" + id, {
        method: "PUT",
        body: JSON.stringify({
          fristnameuser: fromProfile.fristnameuser,
          lastnameuser: fromProfile.lastnameuser,
          useraddress: fromProfile.useraddress,
          userzibId: fromProfile.userzibId,
          userphone: fromProfile.userphone,
          province: fromProfile.province,
          updatedby: session?.user.nickname,

        }),
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res !== null) {
            Swal.fire({
              title: 'แก้ไขที่อยู่สำเร็จ',
              text: 'ที่อยู่ถูกเพิ่ม!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ตกลง',
            }).then((result) => {
              if (result.isConfirmed) {
                {


                  window.location.replace("/account/" + session?.user.userid)
                }
              }
            })
          }

        })
    }
    else {

      // console.log("target", e.target.value);
      // console.log("name", e.target.name);
      const response = await axios.post(api + "image", imageFile, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(async resp => {
        // console.log("formData", item);
        e.preventDefault();
        await axios.put(api + "userdetail/" + id, {
          fristnameuser: fromProfile.fristnameuser,
          lastnameuser: fromProfile.lastnameuser,
          useraddress: fromProfile.useraddress,
          userzibId: fromProfile.userzibId,
          userphone: fromProfile.userphone,
          userphone: fromProfile.userphone,
          province: fromProfile.province,
          Avatar: resp.data.data.data,
          updatedby: session?.user.nickname,
        }, {

        }).then(async (res) => {
          console.log(res.data)

          if (res !== null) {
            Swal.fire({
              title: 'อัพรูปภาพสำเร็จ',
              text: 'อัพรูปภาพ!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'ตกลง',
            }).then((result) => {
              if (result.isConfirmed) {
                {


                  window.location.replace("/account/" + session?.user.userid)
                }
              }
            })
          }
        })
      })
      console.log(imageFile)


    }
  }



  const handleChange = (e) => {
    if (e.target.name === "Avatar") {
      const urlImg = URL.createObjectURL(e.target.files[0]);
      setImageUrl(urlImg);
      setImageFile({
        file: e.target.files[0],
      });
    } else {
      setFormProfile({
        ...fromProfile,
        [e.target.name]: e.target.value,
      });
    }
  }
  
  return (
    <>

      {/* <div  className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
</div> */}

      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="-mt-16 sm:mx-auto sm:w-full sm:max-w-3xl">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit} action='#' >
              <h3 className='text-lg'>แก้ไขโปรไฟล์</h3>
              <br></br>
              <div className="flex items-center  w-44">
                <label htmlFor="Avatar" className="relative flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                
                  {/* <img
                    src={imageUrl}
                    className="absolute inset-0 object-cover w-full h-full opacity-50 image-overlay"
                  /> */} {imageUrl === userAvatar ? (
  <img className="absolute inset-0 object-cover w-full h-full opacity-50 image-overlay" src={imageUrl} />
  ) : (
    <img className="absolute inset-0 object-cover w-full h-full opacity-50 image-overlay" src={userAvatar}  />
  )}
  
  

                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">อัพโหลดโปรไฟล์</span> </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG </p>
                  </div>
                  <input id="Avatar" type="file" name='Avatar' accept='image/*' onChange={(e) => handleChange(e)} className="hidden" />
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6 mt-4">

                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="fristnameuser" onChange={(e) => handleChange(e)} defaultValue={fromProfile.fristnameuser} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="lastnameuser" onChange={(e) => handleChange(e)} defaultValue={fromProfile.lastnameuser} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">นามสกุล</label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="useraddress" id="useraddress" onChange={(e) => handleChange(e)} defaultValue={fromProfile.useraddress} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ที่อยู่</label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="userzibId" onChange={(e) => handleChange(e)} defaultValue={fromProfile.userzibId} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสไปรษณีย์</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="province" onChange={(e) => handleChange(e)} defaultValue={fromProfile.province} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">จังหวัด</label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="tel" name="userphone" onChange={(e) => handleChange(e)} defaultValue={fromProfile.userphone} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                </div>


              </div>
              <button type="submit" className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default accountpage