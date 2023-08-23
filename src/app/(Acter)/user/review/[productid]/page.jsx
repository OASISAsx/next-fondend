'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const reviewPage = () => {
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
    // console.log(number(ticketid))
    useEffect(() => {
        loadData(productid)
        // console.clear()
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
        })
    }
    console.log("formData", formData);

    const handleSubmit = async (e) => {
        Swal.fire({
            title: 'กำลังทำรายการ',
            html: '<button class="btn btn-info" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>',
            showConfirmButton: false,
            allowOutsideClick: false,
        })
        e.preventDefault();
        const response = await axios.post(api + "image", imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async resp => {
            e.preventDefault();
            console.log("formData", formData);
            const postData = await fetch(api + "review", {
                method: 'POST',
                body: JSON.stringify({
                    userid: session?.user.userid,
                    rvrank: formData.rvrank,
                    rvcomment: formData.rvcomment,
                    rvimg: resp.data.data.data,
                    createdby: session?.user.nickname,
                }),
                headers: { "content-type": "application/json" }
            }, { ticketid }).then(res => res.json())
                .then(res => {
                    if (res !== null) {
                        Swal.fire({
                            title: 'รีวิวสำเร็จ',
                            text: 'กลับไปยังหน้ารีวิว',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.replace("/review")
                            }
                        })
                    }
                })
        })
    }
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
                                    <label for='rating-opt5'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt4' data-idx='1' value='4' onClick={(e) => handleChange(e)} />
                                    <label for='rating-opt4'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt3' data-idx='2' value='3' onClick={(e) => handleChange(e)} />
                                    <label for='rating-opt3'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt2' data-idx='3' value='2' onClick={(e) => handleChange(e)} />
                                    <label for='rating-opt2'></label>

                                    <input type='radio' className='hidden' name='rvrank' id='rating-opt1' data-idx='4' value='1' onClick={(e) => handleChange(e)} />
                                    <label for='rating-opt1'></label>
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
                                    <textarea name="rcvcomment" onChange={(e) => handleChange(e)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
                                </div>
                            </div>
                            <div>
                              
                                 <div className="flex items-center  w-56">
                  <label htmlFor="dropzone-file"  className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <img
                      src={imageUrl}
                      className="absolute inset-0 object-cover w-full h-full opacity-50 image-overlay"

                    />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG </p>
                    </div>
                    <input id="dropzone-file" type="file" name='productimages'
                      accept='image/*'
                      onChange={(e) => handleChange(e)}
                      className="hidden" />
                  </label>
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

export default reviewPage