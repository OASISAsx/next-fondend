"use client"
// rafce
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const sellermanage = () => {
    const [error, setError] = useState(null);
    const { userid } = useParams();
    const [data, setData] = useState([])
    const { data: session } = useSession()
    console.log("🚀 ~ file: page.jsx:11 ~ sellermanage ~ data:", data)
    const api = process.env.API_ENDPOINT;
    const myInt = parseInt(userid, 10);
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {

        loadData()
    }, [])

    const loadData = async () => {
        const res = await axios.get(api + "products")
        setData(res.data)
        // setIsLoaded(true)
        // if (userid !== undefined) {
        //   loadDataByid(userid)
        // }

    }
    // const loadDataByid = async (userid) => {
    //     const response = await axios.get(api + "product/" + userid)
    //       .then(res => {
    //         setData(res.data)
    //         setIsLoaded(true)

    //       }).catch(err => {
    //         setError(err)
    //         // console.log(err);
    //       })
    //   }

    async function handleDelete(productid) {
        Swal.fire({
            title: 'ต้องการลบรายการ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Delete!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(api + "product/" + productid)
                    .then(res => {
                        // console.log(res);

                        loadData()
                            .catch(err => console.log(err))
                    })
                Swal.fire(
                    'Deleted!',
                    'You clicked the button!',
                    'success'
                )
            }
        })
    }

    return (
        <>
        {session?.user.roleId === "seller" &&
            <div className="max-w-2xl py-2 lg:max-w-none justify-center ">
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
                                    จำนวนชิ้น
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ราคา
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ประเภท
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
                                        <img src={item.productimages} />

                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.createddate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productstock}ชิ้น
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productprice}฿
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.producttype}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 mr-10">Edit</a> */}
                                        <Link href={"/seller/editing/" + item.productid}>   <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">แก้ไขสินค้า</button>
                                        </Link>
                                        {/* <button onClick={() => handleDelete(item.productid)} className="font-medium text-red-600 dark:text-blue-500  px-6 py-4">Remove</button> */}
                                        <button type="button" onClick={() => handleDelete(item.productid)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ลบสินค้า</button>

                                    </td>
                                </tr>
                            )}



                        </tbody>
                    </table>
                </div>

            </div>
}

            {session?.user.roleId === "admin" &&
            <div className="max-w-2xl py-2 lg:max-w-none justify-center ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
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
                                    จำนวนชิ้น
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ราคา
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ประเภท
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                                //ค่าตรงกันจะแสดง สินค้าที่มี
                               
                                <tr className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800" key={index}>
                                    <td className="w-32 p-4">
                                        <img src={item.productimages} />

                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.createddate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productstock}ชิ้น
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.productprice}฿
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.producttype}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 mr-10">Edit</a> */}
                                        <Link href={"/seller/editing/" + item.productid}>   <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">แก้ไขสินค้า</button>
                                        </Link>
                                        {/* <button onClick={() => handleDelete(item.productid)} className="font-medium text-red-600 dark:text-blue-500  px-6 py-4">Remove</button> */}
                                        <button type="button" onClick={() => handleDelete(item.productid)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ลบสินค้า</button>

                                    </td>
                                </tr>
                            )}



                        </tbody>
                    </table>
                </div>

            </div>

                            }



        </>
    )
}

export default sellermanage