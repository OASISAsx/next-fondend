"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/min/locales';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import CheckSilp from '@/components/CheckSilp';
import { useSession } from 'next-auth/react';

const History = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams()
  const [showModals, setShowModals] = useState(false);
  const [detail, setDetail] = useState({});
  const { data: session } = useSession()
  useEffect(() => {
    // loadData()
    loadDataId(userid)
  }, [])

  const loadDataId = async (userid) => {
    const response = await axios.get(api + "buydetails/user/" + userid)
      .then(res => {
        setItem(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      })
  }

  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(e.target.value);
  }

  async function handleChangesST(payid) {

    Swal.fire({
      title: 'ยืนยันการเปลี่ยนสถานะ',
      text: 'คุณได้รับของแล้วใช่หรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.put(api + "buydetail/" + payid, { paymentstatus: "ทำรายการสำเร็จ" })
          .then(res => {
            loadDataId(userid);
            Swal.fire(
              'เปลี่ยนสถานะสำเร็จ!',
              'สถานะได้ถูกเปลี่ยนเป็น "ทำรายการสำเร็จ" เรียบร้อยแล้ว!',
              'success'
            );
          })
          .catch(err => {
            Swal.fire(
              'เกิดข้อผิดพลาด!',
              'มีบางอย่างผิดพลาดในการเปลี่ยนสถานะ',
              'error'
            );
          });
      }
    });
  }


  async function handleDelete(payid) {
    Swal.fire({
      title: 'คุณต้องการลบรายการหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "buydetail/" + payid)
          .then(res => {
            loadDataId(userid);
          })
        Swal.fire(
          'ลบสำเร็จ!',
          'ระบบได้ทำการลบเรียบร้อยแล้ว!',
          'success'
        )
      }
    })
  }

  return (
    <>
      <Fragment>
        <h2 className="text-xl text-center lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium py-4">ประวัติการซื้อ</h2>
        {session?.user.roleId === "user" && (
        <div className=" flex items-center  justify-center  ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3">รูปสินค้า
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  ชื่อสินค้า
                </th>
                <th scope="col" className="px-6 py-3">
                  วันที่ซื้อ
                </th>
                <th scope="col" className="px-6 py-3">
                  ราคา (THB)
                </th>
                <th scope="col" className="px-6 py-3">
                  สถานะ
                </th>
                <th scope="col" className="px-6 py-3">
                  
                </th>
                <th scope="col" className="px-6 py-3">
                  ทำรายการสำเร็จ
                </th>
                <th scope="col" className="px-6 py-3">
                  ลบรายการ
                </th>

              </tr>
            </thead>
            {item.map((res, index) => (
              res.productname.toLowerCase().includes(query.toLowerCase()) &&
              <tbody className="border-b hover:bg-gray-300  text-center" key={index}>
                <tr className="border-b  whitespace-nowrap dark:text-white">
                  <td className="w-32 p-4">
                    <img src={res.productimages} />

                  </td>
                  <td scope="row" className="px-6 py-3">
                    {res.productname}
                  </td >
                  <td className="px-6 py-3">
                    {moment(res.createddate).locale('th').format('ll')}
                  </td>
                  <td className="px-6 py-3">
                    {res.productprice}฿
                  </td>

                  <td className="px-6 py-3 ">
                    <div >
                      <div className="p-1  bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-red-950 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                        <span className="font-semibold mr-2 text-left flex-auto">{res.paymentstatus}</span>
                      </div>
                    </div>
                  </td>

                  <td>

                    <td className='flex-auto'>
                      {res.paymentstatus === "ทำรายการสำเร็จ" ? (
                        <button type="button" className=" flex  font-semibold text-gray-900 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        <Link 
                          href={"/user/review/" + res.productid}
                          className=' flex items-center'
                        >
                          <svg

                            width='17'
                            height='18'
                            
                            viewBox='0 0 256 256'
                            xmlns='http://www.w3.org/2000/svg'
                            className='flex flex-col justify-center items-center '
                          >
                            <path fill="currentColor" d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31l13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z" />
                          </svg>
                          <h1>รีวิวรายการนี้</h1>
                        </Link>
                          </button>
                      ) : res.paymentstatus === "กำลังจัดส่ง" ? (
                        <button type="button" className="flex  font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        
                        onClick={() => { setDetail(res), setShowModals(true) }}
                        
                        ><svg className='hover:text-lime-500' width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-.321.169l8.923 5.099l4.016-2.01c-.646-.732-1.688-1.279-3.462-2.21Zm4.17 3.532l-3.998 2V13a.75.75 0 0 1-1.5 0v-2.287l-3.5 1.75v9.441c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978ZM11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286ZM2.96 6.641l9.04 4.52l3.411-1.705l-8.886-5.078l-.103.054c-1.773.93-2.816 1.477-3.462 2.21Z"/>
                    </svg>

                          ดูเลขพัสดุ
                        </button>
                      ) : (
                        <button
                          href='#'
                          disabled
                          className='dark:text-white cursor-not-allowed ml-5 '
                        >
                          รอผลการซื้อ
                        </button>
                      )}
                    </td>



                  </td>
                  <td className="px-6 py-3">
                    {res.paymentstatus === "กำลังดำเนินการ" ? (
                      <button disabled className="disabled-button">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#22c55e"
                            d="M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                          />
                        </svg>
                      </button>
                    ) : (
                      res.paymentstatus === "ทำรายการสำเร็จ" ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="checkmark-icon ml-8"
                        >
                          <path
                            fill="#22c55e"
                            d="M19.7 5.3a1 1 0 0 0-1.4 0L9 14.6l-3.3-3.3a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l10-10a1 1 0 0 0 0-1.4Z"
                          />
                        </svg>
                      ) : (
                        res.paymentstatus === "กำลังจัดส่ง" ? (
                          <button onClick={() => handleChangesST(res.payid)}>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="#22c55e"
                                d="M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                              />
                            </svg>
                          </button>
                        ) : null
                      )
                    )}
                  </td>


                  <td className="px-6 py-3" >
                    <button onClick={() => handleDelete(res.payid)}>
                      <FaTrashAlt className="text-danger"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table></div>
      </div>
        )}
        {session?.user.roleId === "seller" && (
        <div className=" flex items-center  justify-center  ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3">รูปสินค้า
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  ชื่อสินค้า
                </th>
                <th scope="col" className="px-6 py-3">
                  วันที่ซื้อ
                </th>
                <th scope="col" className="px-6 py-3">
                  ราคา (THB)
                </th>
                <th scope="col" className="px-6 py-3">
                  สถานะ
                </th>
                <th scope="col" className="px-6 py-3">
                  
                </th>
                <th scope="col" className="px-6 py-3">
                  ทำรายการสำเร็จ
                </th>
                <th scope="col" className="px-6 py-3">
                  ลบรายการ
                </th>

              </tr>
            </thead>
            {item.map((res, index) => (
              res.productname.toLowerCase().includes(query.toLowerCase()) &&
              <tbody className="border-b hover:bg-gray-300  text-center" key={index}>
                <tr className="border-b  whitespace-nowrap dark:text-white">
                  <td className="w-32 p-4">
                    <img src={res.productimages} />

                  </td>
                  <td scope="row" className="px-6 py-3">
                    {res.productname}
                  </td >
                  <td className="px-6 py-3">
                    {moment(res.createddate).locale('th').format('ll')}
                  </td>
                  <td className="px-6 py-3">
                    {res.productprice}฿
                  </td>

                  <td className="px-6 py-3 ">
                    <div >
                      <div className="p-1  bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-red-950 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                        <span className="font-semibold mr-2 text-left flex-auto">{res.paymentstatus}</span>
                      </div>
                    </div>
                  </td>

                  <td>

                    <td className='flex-auto'>
                      {res.paymentstatus === "ทำรายการสำเร็จ" ? (
                        <button type="button" className=" flex  font-semibold text-gray-900 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        <Link 
                          href={"/seller/review/" + res.productid}
                          className=' flex items-center'
                        >
                          <svg

                            width='17'
                            height='18'
                            
                            viewBox='0 0 256 256'
                            xmlns='http://www.w3.org/2000/svg'
                            className='flex flex-col justify-center items-center '
                          >
                            <path fill="currentColor" d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31l13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z" />
                          </svg>
                          <h1>รีวิวรายการนี้</h1>
                        </Link>
                          </button>
                      ) : res.paymentstatus === "กำลังจัดส่ง" ? (
                        <button type="button" className="flex  font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        
                        onClick={() => { setDetail(res), setShowModals(true) }}
                        
                        ><svg className='hover:text-lime-500' width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-.321.169l8.923 5.099l4.016-2.01c-.646-.732-1.688-1.279-3.462-2.21Zm4.17 3.532l-3.998 2V13a.75.75 0 0 1-1.5 0v-2.287l-3.5 1.75v9.441c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978ZM11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286ZM2.96 6.641l9.04 4.52l3.411-1.705l-8.886-5.078l-.103.054c-1.773.93-2.816 1.477-3.462 2.21Z"/>
                    </svg>

                          ดูเลขพัสดุ
                        </button>
                      ) : (
                        <button
                          href='#'
                          disabled
                          className='dark:text-white cursor-not-allowed ml-5 '
                        >
                          รอผลการซื้อ
                        </button>
                      )}
                    </td>



                  </td>
                  <td className="px-6 py-3">
                    {res.paymentstatus === "กำลังดำเนินการ" ? (
                      <button disabled className="disabled-button">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#22c55e"
                            d="M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                          />
                        </svg>
                      </button>
                    ) : (
                      res.paymentstatus === "ทำรายการสำเร็จ" ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="checkmark-icon ml-8"
                        >
                          <path
                            fill="#22c55e"
                            d="M19.7 5.3a1 1 0 0 0-1.4 0L9 14.6l-3.3-3.3a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l10-10a1 1 0 0 0 0-1.4Z"
                          />
                        </svg>
                      ) : (
                        res.paymentstatus === "กำลังจัดส่ง" ? (
                          <button onClick={() => handleChangesST(res.payid)}>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="#22c55e"
                                d="M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                              />
                            </svg>
                          </button>
                        ) : null
                      )
                    )}
                  </td>


                  <td className="px-6 py-3" >
                    <button onClick={() => handleDelete(res.payid)}>
                      <FaTrashAlt className="text-danger"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table></div>
      </div>
        )}

        {session?.user.roleId === "admin" && (
          <div className=" flex items-center  justify-center  ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3">รูปสินค้า
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อสินค้า
                    </th>
                    <th scope="col" className="px-6 py-3">
                      วันที่ซื้อ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา (THB)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      สถานะ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ทำรายการสำเร็จ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ลบรายการ
                    </th>

                  </tr>
                </thead>
                {item.map((res, index) => (
                  res.productname.toLowerCase().includes(query.toLowerCase()) &&
                  <tbody className="border-b hover:bg-gray-300  text-center" key={index}>
                    <tr className="border-b  whitespace-nowrap dark:text-white">
                      <td className="w-32 p-4">
                        <img src={res.productimages} />

                      </td>
                      <td scope="row" className="px-6 py-3">
                        {res.productname}
                      </td >
                      <td className="px-6 py-3">
                        {moment(res.createddate).locale('th').format('ll')}
                      </td>
                      <td className="px-6 py-3">
                        {res.productprice}฿
                      </td>

                      <td className="px-6 py-3 ">
                        <div >
                          <div className="p-1  bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                            <span className="flex rounded-full bg-red-950 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                            <span className="font-semibold mr-2 text-left flex-auto">{res.paymentstatus}</span>
                          </div>
                        </div>
                      </td>

                      <td>

                        <td className='flex-auto'>
                          {res.paymentstatus === "ทำรายการสำเร็จ" ? (
                            <button type="button" className=" flex  font-semibold text-gray-900 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            <Link 
                              href={"/admin/review/" + res.productid}
                              className=' flex items-center'
                            >
                              <svg

                                width='17'
                                height='18'
                                
                                viewBox='0 0 256 256'
                                xmlns='http://www.w3.org/2000/svg'
                                className='flex flex-col justify-center items-center '
                              >
                                <path fill="currentColor" d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31l13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z" />
                              </svg>
                              <h1>รีวิวรายการนี้</h1>
                            </Link>
                              </button>
                          ) : res.paymentstatus === "กำลังจัดส่ง" ? (
                            <button type="button" className="flex  font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            
                            onClick={() => { setDetail(res), setShowModals(true) }}
                            
                            ><svg className='hover:text-lime-500' width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000" d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-.321.169l8.923 5.099l4.016-2.01c-.646-.732-1.688-1.279-3.462-2.21Zm4.17 3.532l-3.998 2V13a.75.75 0 0 1-1.5 0v-2.287l-3.5 1.75v9.441c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978ZM11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286ZM2.96 6.641l9.04 4.52l3.411-1.705l-8.886-5.078l-.103.054c-1.773.93-2.816 1.477-3.462 2.21Z"/>
                        </svg>

                              ดูเลขพัสดุ
                            </button>
                          ) : (
                            <button
                              href='#'
                              disabled
                              className='dark:text-white cursor-not-allowed ml-5 '
                            >
                              รอผลการซื้อ
                            </button>
                          )}
                        </td>



                      </td>
                      <td className="px-6 py-3">
                        {res.paymentstatus === "กำลังดำเนินการ" ? (
                          <button disabled className="disabled-button">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="#22c55e"
                                d="M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                              />
                            </svg>
                          </button>
                        ) : (
                          res.paymentstatus === "ทำรายการสำเร็จ" ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="checkmark-icon ml-8"
                            >
                              <path
                                fill="#22c55e"
                                d="M19.7 5.3a1 1 0 0 0-1.4 0L9 14.6l-3.3-3.3a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l10-10a1 1 0 0 0 0-1.4Z"
                              />
                            </svg>
                          ) : (
                            res.paymentstatus === "กำลังจัดส่ง" ? (
                              <button onClick={() => handleChangesST(res.payid)}>
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill="#22c55e"
                                    d="M12 13a5 5 0 0 1-5-5h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2a5 5 0 0 1-5 5m0-10a3 3 0 0 1 3 3H9a3 3 0 0 1 3-3m7 3h-2a5 5 0 0 0-5-5a5 5 0 0 0-5 5H5c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                                  />
                                </svg>
                              </button>
                            ) : null
                          )
                        )}
                      </td>


                      <td className="px-6 py-3" >
                        <button onClick={() => handleDelete(res.payid)}>
                          <FaTrashAlt className="text-danger"></FaTrashAlt>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table></div>
          </div>
        )}
        <CheckSilp isOpen={showModals} onClose={() => setShowModals(false)} details={detail} payid={detail.payid} />
      </Fragment>
    </>
  )
}

export default History