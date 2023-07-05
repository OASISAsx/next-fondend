"use client"
// rafce
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';

const sellermanage = () => {

    const { userid } = useParams();
    const [data, setData] = useState([])
    console.log("🚀 ~ file: page.jsx:11 ~ sellermanage ~ data:", data)
    const api = process.env.API_ENDPOINT;
    const myInt = parseInt(userid, 10);



    useEffect(() => {

        loadData()
    }, [])

    const loadData = async () => {
        const res = await axios.get(api + "products")

        setData(res.data)

    }
    return (
        <>
            <div className="max-w-2xl py-2 lg:max-w-none justify-center">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    วันที่ขาย
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ราคา
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                                //ค่าตรงกันจะแสดง สินค้าที่มี
                                myInt === item.svcid &&
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-800" key={index}>
                                    <td className="w-32 p-4">
                                        <img src={item.productimages} alt="Apple Watch" />

                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.createddate}
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                                        <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline px-6 py-4">Remove</a>
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

export default sellermanage