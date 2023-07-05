'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'




const addproduct = () => {
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState([])
  // console.log("🚀 ~ file: page.jsx:14 ~ addproduct ~ imageFile:", imageFile)
  const [imageUrl, setImageUrl] = useState([])

  const [item, setItem] = useState([])
  // console.log("🚀 ~ file: page.jsx:16 ~ addproduct ~ item:", item)
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams();
  const { data: session } = useSession()
  
  
  console.log(userid)
  const handleSubmit = async (e) => {
    // console.log("🚀 ~ file: page.jsx:14 ~ addproduct ~ imageFile:", imageFile)
    Swal.fire({
      title: 'กำลังทำรายการ',
      html: '<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>',
      showConfirmButton: false,
      allowOutsideClick: false,
    })
    e.preventDefault();
    // console.log("target", e.target.value);
    // console.log("name", e.target.name);
    const response = await axios.post(api + "image", imageFile, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(async resp => {
      // console.log("formData", item);
      e.preventDefault();
      const postData = await fetch(api + "product", {
        method: 'POST',
        body: JSON.stringify({
          svcid: session?.user.userid,
          productname: item.productname,
          productdesc: item.productdesc,
          productimages: resp.data.data.data,
          producttype: item.producttype,
          createdby: session?.user.nickname,
        }),
        headers: { "content-type": "application/json" }
      }).then(res => res.json())
        .then(res => {

          if (res !== null) {
            Swal.fire({
              title: 'เพิ่มรายการสำเร็จ',
              text: 'กลับไปยังหน้าแดชบอร์ด',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed) {
                {
                  session?.user.roleId === "Admin"
                    ?
                    window.location.replace("/admin/manage")
                    :
                    window.location.replace("/seller/manage/" + session?.user.userid)
                }
              }
            })
          }
        })
    })
    console.log(imageFile)


  }
  const handleChange = (e) => {
    // console.log(e.target.files[0])
    if (e.target.name === "productimages") {
      const urlImg = URL.createObjectURL(e.target.files[0]);
      setImageUrl(urlImg);
      setImageFile({
        file: e.target.files[0],
      })

    }
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      userid: session?.user.userid,
    })


  }

  const type = [{ value: "รองเท้า" }, { value: "เครื่องประดับ" }, { value: "ฟิกเกอร์" }, { value: "ของโบราณ" }, { value: "อื่นๆ" }]
  return (
    <>

      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-4  ml-10 sm:w-full sm:max-w-3xl">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit}>

              <li>เพิ่มสินค้า</li>
              <div className="max-w-2xl py-2 lg:max-w-none justify-center">
                <div className="relative z-0 w-full mb-6 group  ">
                  <input type="text" name="productname"
                    onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="productname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อสินค้า</label>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="productdesc"
                      onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="productdesc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รายละเอียด</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select type="producttype" name='producttype'
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">

                      {type.map((type, index) =>
                        <option key={index} value={type.value}>{type.value}</option>
                      )}
                    </select>
                    <label htmlFor="producttype" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ประเภทสินค้า</label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="file" name='productimages'
                      accept='image/*'
                      multiple pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="productimages" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 " aria-describedby="file_input_help" id="file_input" > อัพโหลดรูปภาพ</label>
                  </div>


                </div>
                <button type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 container'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {imageUrl.length > 2

            ? (
              <>
                <div className='container bg-white rounded-lg shadow-lg p-10'>
                  <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    ตัวอย่างรูป
                  </h1>
                  <img
                    className="mx-auto h-auto w-auto"
                    src={imageUrl}
                    alt="PromptPay"
                  />
                </div>
              </>
            )
            : (
              <>
                <div className='container'>
                  {/* <img
                      className="mx-auto h-auto w-auto"
                      src="https://www.finnomena.com/wp-content/uploads/2016/10/promt-pay-logo.jpg"
                      alt="PromptPay"
                    />
                    <img
                      className="mx-auto h-auto w-auto"
                      src={item.ticketqr}
                      alt="PromptPay"
                    /> */}
                  <h1 className="mt-10 text-center text-2xl font-bold dark:text-white leading-9 tracking-tight text-gray-900">
                    ตัวอย่างรูป
                  </h1>
                </div>
              </>
            )
          }
        </div>
      </div>






    </>
  )
}

export default addproduct