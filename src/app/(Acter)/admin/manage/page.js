'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FiTrash } from "react-icons/fi";
import moment from 'moment';
import 'moment/min/locales';
import Swal from 'sweetalert2';




const managepage = () => {
  const [data, setData] = useState([])
  const uriUser = 'http://localhost:8088/v1/register/role/'
  console.log("🚀 ~ file: page.js:15 ~ managepage ~ uriUser:", uriUser)
  const api = process.env.API_ENDPOINT;
  useEffect(() => {

    loadData()
  }, [])

  const loadData = async () => {
    const res = await axios.get(api + "registers")

    setData(res.data)

  }
  const handleChangeRole = async (e, id) => {
    console.log(e.target.value, id)
    const roleId = e.target.value
    const res = await axios.put(uriUser + id, { roleId })
      .then(res => {
        loadData()

      }).catch(err => console.log(err))
  }
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'ต้องการลบบัญชีนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'ยืนยัน',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน!',
  }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "register/" + id)
        .then(res => {
          loadData()
                  loadData()
                      .catch(err => console.log(err))
              })
          Swal.fire(
              'ลบสำเร็จ!',
              'คุณได้ทำการลบผู้ใช้!',
              'สำเร็จ'
          )
      }
  })
  }

  console.log(data)
  const roles = ['admin', 'user', 'seller']

  const handleChange = async (e, id) => {

    const recordstatus = e.target.checked
    const res = await axios.put(api + "register/status/" + id, { recordstatus })
      .then(res => {
        loadData()

      }).catch(err => console.log(err))
  }


  

  return (
    <>

      <div className="max-w-2xl py-2 lg:max-w-none justify-center">
      <h2 className="text-xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium py-4">จัดการผู้ใช้</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ลำดับ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ชื่อ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    อีเมล
                  </th>
                  <th scope="col" className="px-12 py-3 ">
                    ผู้ใช้งาน
                  </th>
                  <th scope="col" className="px-8 py-3 ">
                    สถานะ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    วันที่สมัครใช้งาน
                  </th>
                  <th scope="col" className="px-10 py-3">
                    ลบผู้ใช้
                  </th>
                </tr>
              </thead>

            <tbody>
              {data.map((item, index) =>
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                    {index + 1}
                  </th>

                  <td className="px-6 py-4">
                    {item.username}
                  </td>
                  <td className="px-6 py-3">
                    {item.email}
                  </td>
                  <td className="px-7 py-7">
                    <select  className="form-select text-white bg-gray-700 rounded-3xl"
                    onChange={(e) => handleChangeRole(e, item.userid)}
                      value={item.roleId}
                    > 
                      {roles.map((item, index) =>
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )}
                    </select>
                  </td>
                  <td >
                    <label className="relative inline-flex items-center mb-4 cursor-pointer form-check form-switch sm:ml-7">
                      <input onChange={(e) => handleChange(e, item.userid)}
                        type="checkbox" className="sr-only peer form-check-input " role="switch" id="flexSwitchCheckChecked"
                        value={item.recordstatus}
                        checked={item.recordstatus} />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                  </td>

                  <td className="px-6 py-4">
                  {moment(item.createddate).locale('th').format('lll' + ' น.')}
                  </td>

                  <td >
                  <button className="iconTrash ml-8">
                  <button type="button" onClick={() => handleDelete(item.userid)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ลบผู้ใช้</button>
                       
                      </button>
                  </td>


                </tr>



              )}

            </tbody>
          </table>
        </div>

      </div>



    </>
  )
}

export default managepage