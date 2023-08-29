"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react'
import { render } from 'react-dom';
import Swal from 'sweetalert2';

const Registration = ({ userdetail }) => {
    const { data: session } = useSession()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({})
    const [formData, setFormData] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const api = process.env.API_ENDPOINT;
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleChange = (e) => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!acceptedTerms || !formData.firstname || !formData.lastname || !formData.phone || !formData.bankname || !formData.bankid || !imageFile.file) {
          Swal.fire({
            title: 'ข้อมูลไม่ครบถ้วน',
            text: 'โปรดกรอกข้อมูลให้ครบถ้วนและอัปโหลดรูปภาพสำเนาบัตรเพื่อดำเนินการต่อ',
            icon: 'error',
            confirmButtonColor: '#e74c3c',
            confirmButtonText: 'ตกลง',
          });
          return;
        }
      
        let timerInterval;
        Swal.fire({
          title: 'กำลังกำเนินการสมัคร!',
          html: 'โหลดข้อมูล  .',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              // ...
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
          
          const response = await axios.post(api + 'image', imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
      
          const postData = {
            userid: session?.user.userid,
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone: formData.phone,
            bankname: formData.bankname,
            bankid: formData.bankid,
            personcard: response.data.data.data,
          };
      
          const registerResponse = await fetch(api + 'sellerdetail', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'content-type': 'application/json' }
          });
      
          const res = await registerResponse.json();
      
          if (res !== null) {
            Swal.fire({
              title: 'ลงทะเบียนสำเร็จ',
              text: 'กรุณารออนุมัติจากแอดมิน',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace('/');
              }
            });
          }
        });
      };
      
      
      
    
    return (
        <>
            <Fragment>
            <div className=" flex-auto">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm -mb-24 text-3xl -mt-5 mr-auto text-zinc-600  ">
            ลงทะเบียนเป็นผู้ขาย
                    </div>

                    <div className="flex justify-center items-center h-screen  ">
                        <form className="space-y-4" action="#" method="POST"
                            encType='multipart/form-data'
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-2 gap-6 -mb-6">
                                <div className="">
                                    <label htmlFor="firstname" className="block text-sm font-medium leading-6 dark:text-white">
                                        ชื่อ
                                    </label>
                                    <input
                                        type='text'
                                        name='firstname'
                                        defaultValue={userdetail.firstname}
                                        placeholder='กรุณากรอกชื่อให้ตรงกับบัตร'
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 dark:text-white">
                                        นามสกุล
                                    </label>
                                    <input
                                        type='text'
                                        name='lastname'
                                        defaultValue={userdetail.lastname}
                                        placeholder='กรุณากรอกนามสกุลให้ตรงกับบัตร'
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 dark:text-white">
                                    เบอร์โทร
                                </label>
                                <div className="mt-1">
                                    <input
                                        type='text'
                                        name='phone'
                                        defaultValue={userdetail.phone}
                                        placeholder='กรุณากรอกเบอร์โทร'
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="bankname" className="block text-sm font-medium leading-6 dark:text-white">
                                        ชื่อธนาคาร
                                    </label>
                                </div>
                                <div className="mt-1">
                                    <input
                                        placeholder='กรุณากรอกชื่อธนาคาร'
                                        type='text'
                                        name='bankname'
                                        defaultValue={userdetail.bankname}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex-box items-center justify-between">
                                    <label htmlFor="bankid" className="block text-sm font-medium leading-6 dark:text-white">
                                        เลขบัญชี
                                    </label>
                                </div>
                                <div className="mt-1">
                                    <input
                                        placeholder='กรุณากรอกเลขบัญชี'
                                        type='text'
                                        name='bankid'
                                        defaultValue={userdetail.bankid}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                           
                             <div className="flex items-center w-2/3">
  <label
    htmlFor="dropzone-file"
    className="relative flex flex-col items-center justify-center w-48 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  >
    <img
      src={imageUrl}
      className="absolute inset-0 object-cover w-full h-full opacity-50 image-overlay"
            alt=""
    />
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">คลิ๊กเพื่ออัปโหลดสำเนาบัตร</span>{" "}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG </p>
    </div>
  

        <input name='file'
          accept='image/*'
          onChange={(e) => handleChange(e)}
          multiple
          className="hidden"
          aria-describedby="file_input_help" id="dropzone-file" type="file"
        />
    </label>
</div> 
<div className="flex items-center mb-4">
  <input
    id="checkbox-1"
    type="checkbox"
    checked={acceptedTerms}
    onChange={() => setAcceptedTerms(!acceptedTerms)}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  />
  <label
    htmlFor="checkbox-1"
    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  >
    ยอมรับเงื่อนไข{" "}
    <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
      terms and conditions
    </a>
    .
  </label>
</div>


                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    disabled={!acceptedTerms}
                                >
                                    ลงทะเบียนเป็นผู้ขาย
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        </>
    )
}

export default Registration