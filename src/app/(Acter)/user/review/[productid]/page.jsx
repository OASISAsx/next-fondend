'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import '@/app/(Acter)/user/review/style.css'

const ReviewPage = () => {
    const { data: session } = useSession()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({})
    const [formData, setFormData] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [imageUrl, setImageUrl] = useState([])

    // const [newImageUrl, setNewImageUrl] = useState([])

    const api = process.env.API_ENDPOINT;
    const { productid } = useParams();
    console.log("🚀 ~ file: page.jsx:22 ~ ReviewPage ~ productid:", productid)
    // console.log(number(ticketid))
    useEffect(() => {
        loadData(productid)
        console.log(productid)
    }, []); 

    const loadData = async (productid) => {
        const response = await axios.get(api + "product/" + productid)
            .then(res => {

                setItem(res.data)
                setIsLoaded(true)

            }).catch(err => {
                setError(err)
                // console.log(err);
            })
    }

    const handleChange = (e) => {
        // console.log("target", e.target.value);
        // console.log("name", e.target.name);

        if (e.target.name === "file") {
            const urlImg = URL.createObjectURL(e.target.files[0]);
            setImageUrl(urlImg);
            setImageFile({
              file: e.target.files[0],
            })
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            userid: session?.user.userid,
            productid: item.productid,
        })
    }
    console.log("formData", formData);

    const handleSubmit = async (e) => {
        try {
            Swal.fire({
                title: 'กำลังทำรายการ',
                html: '<button class="btn btn-info" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>',
                showConfirmButton: false,
                allowOutsideClick: false,
            });
    
            e.preventDefault();
    
            // 1. อัพโหลดรูปภาพ
            const imageResponse = await axios.post(api + "image", imageFile, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            const rvimg = imageResponse.data.data.data;
    
            // 2. ส่งรีวิว
            const postData = {
                userid: session?.user.userid,
                productid: item.productid,
                rvrank: formData.rvrank,
                rvcomment: formData.rvcomment,
                rvimg: rvimg,
                createdby: session?.user.nickname,
            };
    
            const reviewResponse = await fetch(api + "review", {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: { "content-type": "application/json" }
            });
    
            if (reviewResponse.ok) {
                // รีวิวสำเร็จ
                Swal.fire({
                    title: 'รีวิวสำเร็จ',
                    text: 'กลับไปยังหน้ารีวิว',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/review");
                    }
                });
    
                // อัพเดทค่า rvrank ของสินค้า
                await axios.put(api + "product/" + productid, { rvrank: formData.rvrank });
            } else {
                // จัดการกรณีไม่สำเร็จ
                // ...
            }
        } catch (error) {
            // จัดการกรณีเกิดข้อผิดพลาดที่ไม่คาดคิด
            // ...
        }
    };
    
    return (
        <>
            <div class='-mt-14 grid lg:grid-cols-2 lg:gap-2'>
                <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                            {item.productname}
                        </h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" action="#" method="POST"
                            onSubmit={handleSubmit}
                            encType='multipart/form-data'
                        >
                            <div class="flex items-center justify-between">
                                <div class="rating flex ">
                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt5' data-idx='0' value='5' onClick={(e) => handleChange(e)} />
                                    <label htmlFor='rating-opt5'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt4' data-idx='1' value='4' onClick={(e) => handleChange(e)} />
                                    <label htmlFor='rating-opt4'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt3' data-idx='2' value='3' onClick={(e) => handleChange(e)} />
                                    <label htmlFor='rating-opt3'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt2' data-idx='3' value='2' onClick={(e) => handleChange(e)} />
                                    <label htmlFor='rating-opt2'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt1' data-idx='4' value='1' onClick={(e) => handleChange(e)} />
                                    <label htmlFor='rating-opt1'></label>
                                </div>
                                <p class="dark:text-white">คะแนนรีวิว</p>
                            </div>
                            <div>
                                <div class="flex items-center justify-between">
                                    <label class="block text-sm font-medium leading-6 dark:text-white">
                                        รายละเอียด
                                    </label>
                                </div>
                                <div class="mt-2">
                                    <textarea name="rvcomment" onChange={(e) => handleChange(e)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
                                </div>
                            </div>
                            
                              
                            <div>
                <div>
                  <div class="flex items-center justify-between">
                    <label class="block text-sm font-medium leading-6 dark:text-white">
                      ภาพประกอบการรีวิว
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      name='file'
                      accept='image/*'
                      onInput={(e) => handleChange(e)}
                      multiple
                      required
                      className="block w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-describedby="file_input_help" id="file_input" type="file" />
                  </div>
                </div>
                                <br />
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    รีวิวรายการ
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <div class='flex  flex-col justify-center px-6 py-12 lg:px-8 '>
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm  -mr-64">
                        

                             
                             
                                <>
                                    <div class='-ml-3.5 bg-white rounded-lg shadow-lg p-10 item-center'>
                                        <h1 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            {item.productname}
                                        </h1>
                                        <img
                                            class="mx-2 h-80 w-80"
                                            src={item.productimages}
                                            alt="ticketimage"
                                        />
                                    </div>
                                </>
                            
                        
                    </div>
                </div>
            </div>
        </>
    )
}


export default ReviewPage