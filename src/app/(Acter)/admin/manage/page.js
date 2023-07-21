'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FiTrash } from "react-icons/fi";




const managepage = () => {
  const [data, setData] = useState([])
  const uriUser = 'http://localhost:8088/v1/user/role/'
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
    const res = await axios.delete(api + "register/" + id)
      .then(res => {
        loadData()

      }).catch(err => console.log(err))
  }

  console.log(data)
  const roles = ['admin', 'user', 'seller']

  const handleChange = async (e, id) => {

    const recordstatus = e.target.checked
    const res = await axios.put(api + "user/status/" + id, { recordstatus })
      .then(res => {
        loadData()

      }).catch(err => console.log(err))
  }




  return (
    <>

      <div className="max-w-2xl py-2 lg:max-w-none justify-center">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  ชื่อ
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 ">
                  ผู้ใช้งาน
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  วันที่สมัครใช้งาน
                </th>
                <th scope="col" className="px-6 py-3">
                  Acion
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
                  <td className="px-6 py-4">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    <select onChange={(e) => handleChangeRole(e, item.userid)}
                      className='from-control'
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
                    {item.createddate}
                  </td>

                  <td >
                  <button className="iconTrash ml-8">
                     <FiTrash className="w-6 h-6 " onClick={() => handleDelete(item.userid)}/> 
                       
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