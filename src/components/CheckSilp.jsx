"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';
import Swal from 'sweetalert2';
import { render } from 'react-dom';
import { useSession } from 'next-auth/react';

const CheckSilp = ({ isOpen, onClose, payid, details }) => {
    // console.log("🚀 ~ file: checksilp.jsx:10 ~ CheckSilp ~ payid:", payid)
    if (!isOpen) return null;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({});
    const [formData, setFormData] = useState([])
    const api = process.env.API_ENDPOINT;
    const { data: session } = useSession()
    const handleChange = (e) => {


        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            //   userid: session?.user.userid,
        })
    }

    const handleSubmit = async (e) => {
        
    let timerInterval
    Swal.fire({
      title: 'กำลังกำเนินการสั่งซื้อ!',
      html: 'โหลดข้อมูล  .',
      timer: 2300,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
         
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
        e.preventDefault();

        const postData = await fetch(api + `buydetail/${payid}`, {
            method: 'PUT',
            body: JSON.stringify({
                parnum: formData.parnum,
                transport: formData.transport,



            }),

            headers: { "content-type": "application/json" }
        }).then(res => res.json())
            .then(res => {

                if (res !== null) {
                    Swal.fire({
                        title: 'กรอกข้อมูลพัสดุเสร็จสิ้น',
                        text: 'ระบบกำลังแจ้งไปยังผู้ซื้อ',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.replace("/admin/payment")
                            
                        }
                    })
                }
            })
    }

    return (
    <>
    {session?.user.roleId === "seller" &&
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
            <div className="w-[60%] h-[55%]  rounded-lg flex flex-col">
                <button className='px-5 py-4.5 mr-5 justify-center items-center place-self-end text-white' onClick={() => onClose()}>ปิด X</button>
                <div className="bg-white p-20 rounded-lg">
                    <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-4" action="#" method="POST"
                            encType='multipart/form-data'
                            onSubmit={handleSubmit}
                        >



                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="bankname" className="block text-sm font-medium leading-6 dark:text-white">
                                        เลขพัสดุ
                                    </label>
                                </div>
                                <div className="mt-1">
                                    <input
                                        placeholder='กรุณากรอกเลขพัสดุ'
                                        type='text'
                                        name='parnum'
                                        defaultValue={details.parnum}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="bankid" className="block text-sm font-medium leading-6 dark:text-white">
                                        บริษัทขนส่งพัสดุ
                                    </label>
                                </div>
                                <div className="mt-1">
                                    <input
                                        placeholder='กรุณากรอกชื่อบริษัทขนส่งพัสดุ'
                                        type='text'
                                        name='transport'
                                        defaultValue={details.transport}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    ยืนยัน
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            
           
            </div>
        </div>
}
 {session?.user.roleId === "user" &&
  <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
  <div className="w-[40%] h-[60%]  rounded-lg flex flex-col">
      <button className='px-5 py-4.5  justify-center items-center place-self-end text-white' onClick={() => onClose()}>ปิด X</button>
      <div className="bg-white p-16 rounded-lg ">
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm ">
              <form className="space-y-4" action="#" method="POST"
                  encType='multipart/form-data'
                  onSubmit={handleSubmit}
              >



                  <div>
                      <div className="flex items-center justify-between">
                          <label htmlFor="bankname" className="block text-sm font-medium leading-6 dark:text-white">
                              เลขพัสดุ
                          </label>
                      </div>
                      <div className="mt-1">
                          <input
                              placeholder='กรุณากรอกเลขพัสดุ'
                              type='text'
                              name='parnum'
                              defaultValue={details.parnum}
                              required
                              disabled
                              onChange={(e) => handleChange(e)}
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>
                  <div>
                      <div className="flex items-center justify-between">
                          <label htmlFor="bankid" className="block text-sm font-medium leading-6 dark:text-white">
                              บริษัทขนส่งพัสดุ
                          </label>
                      </div>
                      <div className="mt-1">
                          <input
                              placeholder='กรุณากรอกชื่อบริษัทขนส่งพัสดุ'
                              type='text'
                              name='transport'
                              defaultValue={details.transport}
                              required
                              disabled
                              onChange={(e) => handleChange(e)}
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <button className='black_btn mr-4' onClick={() => onClose()}>ปิดหน้าต่าง</button>
                      </div>
                  </div>

                  <div>
                     
                  </div>
              </form>
          </div>
      </div>

  
 
  </div>
</div>

            }
            {session?.user.roleId === "admin" &&
  <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
  <div className="w-[40%] h-[60%]  rounded-lg flex flex-col">
      <button className='px-5 py-4.5  justify-center items-center place-self-end text-white' onClick={() => onClose()}>ปิด X</button>
      <div className="bg-white p-16 rounded-lg ">
          <div className=" sm:mx-auto sm:w-full sm:max-w-sm ">
              <form className="space-y-4" action="#" method="POST"
                  encType='multipart/form-data'
                  onSubmit={handleSubmit}
              >



                  <div>
                      <div className="flex items-center justify-between">
                          <label htmlFor="bankname" className="block text-sm font-medium leading-6 dark:text-white">
                              เลขพัสดุ
                          </label>
                      </div>
                      <div className="mt-1">
                          <input
                              placeholder='กรุณากรอกเลขพัสดุ'
                              type='text'
                              name='parnum'
                              defaultValue={details.parnum}
                              required
                              disabled
                              onChange={(e) => handleChange(e)}
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>
                  <div>
                      <div className="flex items-center justify-between">
                          <label htmlFor="bankid" className="block text-sm font-medium leading-6 dark:text-white">
                              บริษัทขนส่งพัสดุ
                          </label>
                      </div>
                      <div className="mt-1">
                          <input
                              placeholder='กรุณากรอกชื่อบริษัทขนส่งพัสดุ'
                              type='text'
                              name='transport'
                              defaultValue={details.transport}
                              required
                              disabled
                              onChange={(e) => handleChange(e)}
                              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                  </div>

                  <div>
                     
                  </div>
              </form>
          </div>
      </div>

  
 <div className='flex-center mt-3'>
  <button type="button" className="black_btn text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => onClose()}>ปิดหน้าต่าง</button></div>
  </div>
</div>

            }



</>
    )
}

export default CheckSilp