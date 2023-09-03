"use client"
// rafce
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import 'moment/min/locales';

const sellermanage = () => {
    const [error, setError] = useState(null);
    const { userid } = useParams();
    const [data, setData] = useState([])
    const { data: session } = useSession()
    console.log("🚀 ~ file: page.jsx:11 ~ sellermanage ~ data:", data)
    const api = process.env.API_ENDPOINT;
    const myInt = parseInt(userid, 10);
    const [isLoaded, setIsLoaded] = useState(false);
    const { svcid } = useParams();
    const [currentTime, setCurrentTime] = useState(new Date());



    useEffect(() => {

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        if (svcid === undefined) {
            loadData()
        } else {
            loadDataByid(svcid)
        }
        return () => {
            clearInterval(timer);
        };



    }, [])

    const loadData = async () => {
        const res = await axios.get(api + "products")
        setData(res.data)
        // setIsLoaded(true)
        // if (userid !== undefined) {
        //   loadDataByid(userid)
        // }

    }

    async function handleChangesST(e, productid) {
        const status = e.target.value;

        console.log({ status }, productid);
        axios.put(api + "product/" + productid, { status })
            .then(res => {
                if (svcid === undefined) {
                    loadData()
                } else {
                    loadDataByid(svcid)
                }
                console.log(handleChangesST)
            })

    }
        const loadDataByid = async (svcid) => {
            const response = await axios
            .get(api + `products/${svcid}`)
            .then((res) => {
                setItem(res.data);
                setIsLoaded(true);
            })
            .catch((err) => {
                setError(err);
                // console.log(err);
            });
            
    };
    const handleSubmit = async ( productid) => {
        Swal.fire({
            title: 'คุณได้ตรวจสอบแล้วใช่หรือไม่',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const status = "ลงขายสินค้าสำเร็จ";
                let timerInterval;
                Swal.fire({
                    title: 'กำลังทำรายการ!',
                    html: 'โหลดข้อมูล  .',
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                            // ทำอะไรสักอย่างที่ต้องการทำระหว่างโหลด
                        }, 100);
                    },
                });
                try {
                   
                    
                    const changeST = await axios.put(api + "product/" + productid, { status });
                    // const sendMail = await axios.post(api + "sender", {
                    //     SubJect: productid.productname,
                    //     Body: `การซื้อ ${productid.productname} เสร็จสิ้น ${productid.status} `,
                    //     To: item.email,
                    //     Image: "https://res.cloudinary.com/dxbbaikj5/image/upload/v1689578414/Morlam/rhhs0v0accks9dkoqwjc.jpg",
                    // });
                    
                    Swal.fire(
                        'สำเร็จ!',
                        'เปลี่ยนสถานะเรียบร้อยแล้ว!',
                        'success'
                    );
                    
                    window.location.reload();
                    onClose();
                } catch (error) {
                    console.error("Error updating sell status:", error);
                }
            }
        });
    };

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
    const status = [{ value: "กำลังดำเนินการ", color: "bg-info text-white" },
    { value: "ลงขายสินค้าสำเร็จ", color: "bg-success  text-white" },

    ]
    return (
        <>
            {session?.user.roleId === "seller" &&
                <div className="max-w-2xl py-2 lg:max-w-none justify-center ">
                    <h2 className="text-xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium py-4">จัดการสินค้า</h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-6">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ชื่อสินค้า
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        วันที่ขาย
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        ราคา
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ประเภท
                                    </th>
                                    <th scope="col" className="px-16 py-3 ">
                                        สถานะ
                                    </th>
                                    <th scope="col" className="px-24 py-3 flex">
                                        จัดการ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) =>
                                    //ค่าตรงกันจะแสดง สินค้าที่มี
                                    myInt === item.svcid &&
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-800" key={index}>
                                        <td className="px-6 py-4">
                                            <img src={item.productimages} className="custom-image" />
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.productname}
                                        </td>
                                        <td className="px-6 py-4">
                                        {moment(item.createddate).locale('th').format('lll' + ' น.')}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.productprice}฿
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.producttype}
                                        </td>
                                        <td className="px-6 py-4 ">
                                            <td className='flex-auto '>
                                                {item.status === "ลงขายสินค้าสำเร็จ" ? (
                                                    <div

                                                        className='hover:text-amber-400 flex items-center'
                                                    >
                                                        <svg
                                                            width='17'
                                                            height='15'
                                                            viewBox='0 0 256 256'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='flex flex-col justify-center items-center'
                                                        >
                                                            {/* ... ตัววาดรูป SVG ... */}
                                                        </svg>
                                                        <h1>ลงขายสินค้าสำเร็จ</h1>
                                                    </div>
                                                ) : (
                                                    <button
                                                        href='#'
                                                        disabled
                                                        className='dark:text-white cursor-not-allowed ml-5'
                                                    >
                                                        กำลังดำเนินการ
                                                    </button>
                                                )}
                                            </td>


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
                <div className="max-w-2xl py-2 -mt-10 lg:max-w-none justify-center ">
                     <h2 className="text-xl lg:font-bold tracking-tight  dark:text-white xs:text-md xs:font-medium py-4">จัดการสินค้า</h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        ชื่อสินค้า
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        วันที่ขาย
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        ราคา
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ประเภท
                                    </th>
                                    <th scope="col" className="px-16 py-3">
                                        สถานะ
                                    </th>
                                    <th scope="col" className="px-24 py-3 ">
                                        จัดการ
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) =>
                                    //ค่าตรงกันจะแสดง สินค้าที่มี

                                    <tr className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800" key={index}>
                                        <td className="px-2 py-4">
                                            <img src={item.productimages} className="custom-image" />
                                        </td>
                                        <td className="px-6 py-1">
                                            {item.productname}
                                        </td>
                                        <td className="px-2 py-10">
                                        {moment(item.createddate).locale('th').format('lll' + ' น.')}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item.productprice}฿
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.producttype}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select className="form-select text-white bg-gray-700 rounded-3xl"
                                                onChange={(e) => handleChangesST(e, item.productid)}
                                                value={item.status}
                                                key={index}
                                                readOnly
                                            >
                                                {status.map((st, index) => (

                                                    <option readOnly key={index} value={st.value}>{st.value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-1 py-10 ">
                                            <div className='flex '>
                                            {item.status === "กำลังดำเนินการ" ?
                                        <button type="button" onClick={() => handleSubmit(item.productid)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">อนุมัติ</button>
                                        :
                                        <button type="button"  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#ffffff" d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>
                                    </svg></button>
                                                }
                                            {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 mr-10">Edit</a> */}
                                            <Link href={"/admin/editing/" + item.productid}>   <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">แก้ไขสินค้า</button>
                                            </Link>

                                            {/* <button onClick={() => handleDelete(item.productid)} className="font-medium text-red-600 dark:text-blue-500  px-6 py-4">Remove</button> */}
                                            <button type="button" onClick={() => handleDelete(item.productid)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ลบสินค้า</button>
</div>
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