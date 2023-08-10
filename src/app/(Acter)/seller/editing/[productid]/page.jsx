'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'





const editing = () => {
  const [fromProfile, setFormProfile] = useState({})
  const [imageFile, setImageFile] = useState([])
  const { data: session } = useSession()

  // console.log("🚀 ~ file: page.jsx:14 ~ addproduct ~ imageFile:", imageFile)
  const [imageUrl, setImageUrl] = useState([])
  // const myInt = parseInt(id, 10);
  // console.log("🚀 ~ file: page.jsx:10 ~ accountpage ~ fromProfile:", fromProfile)
  const { productid } = useParams();
  console.log("🚀 ~ file: page.jsx:16 ~ editing ~ productid:", productid)


  const api = process.env.API_ENDPOINT;

  useEffect(() => {


    loadData(productid)
  }

    , [])

  const loadData = async (productid) => {
    await axios.get(api + "product/" + productid)
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
      const postData = await fetch(api + "product/" + productid, {
        method: "PUT",
        body: JSON.stringify({
          productname: fromProfile.productname,
          productdesc: fromProfile.productdesc,
          productstock: fromProfile.productstock,
          productprice: fromProfile.productprice,
          producttype: fromProfile.producttype,
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
              title: 'แก้ไขสินค้าสำเร็จ',
              text: 'กลับไปหน้าแดชบอร์ด',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed) {
                {
                  session?.user.roleId === "admin"
                    ?
                    window.location.replace("/admin/manage")
                    :
                    window.location.replace("/seller/manage/" + session?.user.userid)
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
        await axios.put(api + "product/" + productid, {
          productname: fromProfile.productname,
          productdesc: fromProfile.productdesc,
          productstock: fromProfile.productstock,
          productprice: fromProfile.productprice,
          productimages: resp.data.data.data,
          producttype: fromProfile.producttype,
          updatedby: session?.user.nickname,
        }, {

        }).then(async (res) => {
          console.log(res.data)

          if (res !== null) {
            Swal.fire({
              title: 'แก้ไขรายการสำเร็จ',
              text: 'กลับไปยังหน้าแดชบอร์ด',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed) {
                {
                  session?.user.roleId === "admin"
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
  }

  // Swal.fire({
  //   icon:"info",
  //   title:"ต้องสมัครสมาชิก ?",
  //   showCancelButton: true,
  //   confirmButtonColor:"green",
  //   cancelButtonColor:"#E92F07",
  //   showConfirmButton: true,
  //   cancelButtonText:"ต้องการยกเลิก",



  // }).then(async(result)=>{
  //   if (result.isConfirmed){

  //     e.preventDefaulf()
  //     await axios.put(api+"product/"+productid,fromProfile)
  //     .then(async (res)=>{
  //         console.log(res.data)


  //       }).catch(err=>{
  //           console.log(err=> console.log(err))
  //         })

  //       Swal.fire({
  //         icon:"success",
  //         title:"เสร็จสิ้น",
  //         confirmButtonColor:"green",
  //       }).then(()=>{
  //         // window.location.replace('/')
  //       })
  //     }



  // })


  const handleChange = (e) => {
    if (e.target.name === "productimages") {
      const urlImg = URL.createObjectURL(e.target.files[0]);
      setImageUrl(urlImg);
      setImageFile({
        file: e.target.files[0],
      })

    }
    setFormProfile({
      ...fromProfile,
      [e.target.name]: e.target.value

    })

  }

  const type = [{ defaultvalue: "ประเภทสินค้า" }, { value: "รองเท้า" }, { value: "เครื่องประดับ" }, { value: "ฟิกเกอร์" }, { value: "ของโบราณ" }, { value: "อื่นๆ" }]
  return (
    <>

      <div className="  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-transparent">
        <div className="-mt-10  ml-24 sm:w-full sm:max-w-3xl ">
          <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit}>

              <li>แก้ไขสินค้า</li>
              <div className="max-w-2xl py-2 lg:max-w-none justify-center">
                <div className="relative z-0 w-full mb-6 group  ">
                  <input type="text" name="productname" defaultValue={fromProfile.productname}
                    onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="productname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อสินค้า</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="productstock" defaultValue={fromProfile.productstock}
                      onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="productstock" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">จำนวน</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="productprice" defaultValue={fromProfile.productprice}
                      onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="productprice" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ราคา</label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input type="text" name="productdesc" defaultValue={fromProfile.productdesc}
                      onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="productdesc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รายละเอียด</label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select onChange={(e) => handleChange(e)} type="text" name='producttype' value={fromProfile.producttype}
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">

                      {type.map((type, index) =>
                        <option key={index} value={type.value}>{type.value}</option>
                      )}
                    </select>
                    <label htmlFor="producttype" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ประเภทสินค้า</label>
                  </div>
                </div>
                <div className="flex items-center  w-56">
                  <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                </div> <br></br>
                <button type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>






    </>
  )
}

export default editing