"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/min/locales';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';

const history = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams()

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
       
            
       <div className="max-w-2xl container py-2  lg:max-w-none  justify-center his">
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
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
                  ผลการซื้อ
                </th>
                <th scope="col" className="px-6 py-3">
                  รีวิวรายการ
                </th>
                <th scope="col" className="px-6 py-3">
                  ลบรายการ
                </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-32 p-4">
          <img src="/docs/images/products/apple-watch.png" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          Apple Watch
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $599
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $599
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $599
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>
    </tbody></table></div>
    </div>

    </>
  )
}

export default history