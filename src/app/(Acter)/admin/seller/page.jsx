"use client"
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import Swal from 'sweetalert2';
import React, { Fragment, useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs';
import { BiSolidUserDetail, BiX } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import SellerModal from '@/components/SellerModal';
import CheckSlip from '@/components/checksilp';

const Seller = (userid) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [seller, setSeller] = useState({})
    const [register, setRegister] = useState({})
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const accept = item.filter(user => user.recordstatus === "รออนุมัติ").length;
    const accepted = item.filter(user => user.recordstatus === "อนุมัติแล้ว").length;
    const api = process.env.API_ENDPOINT;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        loadData();
        return () => {
            clearInterval(timer);
        };
    }, [])

    const loadData = async () => {
        const response = await axios.get(api + "sellerdetails")
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItem(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }

    const approve = async (userid) => {
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
                const res = await axios.put(api + `sellerdetail/${userid}`, { recordstatus: "อนุมัติแล้ว" }).then(async res => {
                    await axios.put(api + `register/role/${userid}`, { roleId: "seller" }).then(async res => {
                        Swal.fire(
                            'สำเร็จ!',
                            'อนุมัติเรียบร้อยแล้ว',
                            'success'
                        )
                        loadData();
                    }).catch(err => {
                        console.log("🚀 ~ file: page.jsx:62 ~ res ~ err:", err)
                    })
                }).catch(err => {
                    console.log("🚀 ~ file: page.jsx:62 ~ res ~ err:", err)
                })

            }
        })
    }
    const withhold = async (userid) => {
        Swal.fire({
            title: 'ไม่อนุมัติผู้ใช้?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.put(api + `sellerdetail/${userid}`, { recordstatus: "ไม่ผ่านการอนุมัติ" }).then(res => {
                    loadData();
                    Swal.fire(
                        'สำเร็จ!',
                        'ระบบได้ส่งข้อมูลไปยังผู้ใช้แล้ว',
                        'success'
                    )
                }).catch(err => {
                    console.log("🚀 ~ file: page.jsx:62 ~ res ~ err:", err)
                })

            }
        })
    }

    const handleSearch = async (e) => {
        const prop = e.target.value;
        // console.log(prop);
        setQuery(prop);
    };
    return (
        <Fragment>
            <section>
                {/* <div className="stats shadow flex-center">
                    <div className="stat place-items-center">
                        <div className="stat-title">จำนวนผู้ใช้ทั้งหมด</div>
                        <div className="stat-value">{item.length}</div>
                        <div className="stat-desc">เวลาอ้างอิง: {currentTime.toLocaleTimeString()}</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title">จำนวนพนักงานที่รออนุมัติ</div>
                        <div className="stat-value text-secondary">{accept}</div>
                        <div className="stat-desc text-secondary">รายการ</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-title">จำนวนพนักงานที่อนุมัติแล้ว</div>
                        <div className="stat-value">{accepted}</div>
                        <div className="stat-desc">รายการ</div>
                    </div>
                </div> */}
                <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 -mt-16 lg:px-8">
  <div className="sm:flex sm:space-x-4">
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
      <div className="bg-white p-5">
        <div className="sm:flex sm:items-start">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            <h3 className="text-sm leading-6 font-medium text-gray-400">จำนวนผู้ใช้ทั้งหมด</h3>
            <p className="text-3xl font-bold text-black">{item.length}</p>
            <div className="text-sm leading-6 font-medium text-gray-400">เวลาอ้างอิง: {currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
      <div className="bg-white p-5">
        <div className="sm:flex sm:items-start">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            <h3 className="text-sm leading-6 font-medium text-gray-400">จำนวนพนักงานที่รออนุมัติ</h3>
            <p className="text-3xl font-bold text-black">{accept}</p>
            <p className="text-1xl font-bold text-black">รายการ</p>
          </div>
        </div>
      </div>
    </div>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
      <div className="bg-white p-5">
        <div className="sm:flex sm:items-start">
          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
            <h3 className="text-sm leading-6 font-medium text-gray-400">จำนวนพนักงานที่อนุมัติแล้ว</h3>
            
            <p className="text-3xl font-bold text-black">{accepted}</p>
            <p className="text-1xl font-bold text-black">รายการ</p>
      
      
      
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                <div className='grid grid-cols-2 gap-2 -mt-7'>
                    <div className='flex space-x-2'>
                        <h2 className="text-2xl mr-6  lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">จัดการพนักงาน</h2>
                        {/* <ExportPdf
                        name={"ผู้ใช้ในระบบ"}
                        headers={["ไอดีผู้ใช้", "ชื่อผู้ใช้", "ชื่อเล่น", "อีเมล์", "บทบาท", "วันที่สมัคร"]}
                        data={item.map(({ userid, username, nickname, email, roleid, createddate }) => {
                            return [userid, username, nickname, email, roleid, createddate]
                        })}
                    />
                    <ExportExel
                        name={"ผู้ใช้ในระบบ"}
                        data={item}
                    /> */}
                    </div>
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาผู้ใช้" />
                        </div>
                        <button type="submit" onClick={() => setQuery("")} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <label>รีเฟรช</label>
                        </button>
                    </form>
                </div>
                <div className="max-w-2xl py-2 lg:max-w-none justify-center">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ลำดับ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ไอดีผู้ใช้
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        ชื่อ
                                    </th>
                                    <th scope="col" className="px-6 py-3 ">
                                        นามสกุล
                                    </th>
                                    <th scope="col" className="px-6 py-3 ">
                                        เบอร์โทร
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ธนาคาร
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        เลขบัญชี
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        วันที่สมัคร
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        สถานะ
                                    </th>
                                    <th scope="col" className="px-10 py-5">
                                        จัดการ
                                    </th>
                                </tr>
                            </thead>
                            {/* <thead>
                            <tr className='bg-gray-800 text-white border-1'>
                                <th scope="col">ลำดับ</th>
                                <th scope="col">ไอดีผู้ใช้</th>
                                <th scope="col">ชื่อ</th>
                                <th scope="col">นามสกุล</th>
                                <th scope="col">เบอร์โทร</th>
                                <th scope="col">ธนาคาร</th>
                                <th scope="col">เลขบัญชี</th>
                                <th scope="col">วันที่สมัคร</th>
                                <th scope="col">สถานะ</th>
                                <th scope="col">จัดการ</th>
                            </tr>
                        </thead> */}
                            <tbody>
                                {item.map((res, index) => {
                                    const isMatch = res.recordstatus.toLowerCase().includes(query.toLowerCase()) ||
                                        res.bankid.toLowerCase().includes(query.toLowerCase()) ||
                                        res.bankname.toLowerCase().includes(query.toLowerCase())
                                    // กรองเฉพาะรายการที่ตรงกับการค้นหา
                                    if (!isMatch) {
                                        return null;
                                    }
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                {index + 1}
                                            </th>
                                            <td className="px-7 py-4">
                                                {res.userid}</td>
                                            <td className="px-2 py-4">{res.firstname}</td>
                                            <td className="px-4 py-4">
                                                {res.lastname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.bankname}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.bankid}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(res.createddate).locale('th').format('lll' + ' น.')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.recordstatus}
                                            </td>
                                            <td className="px-5 py-4 ml-10">
                                                <button
                                                    onClick={() => { setSeller(res), setShowModal(true) }}

                                                >
                                                    <FaSearch className="ml-4 text-sky-600" size={"20px"}></FaSearch>
                                                </button>
                                                {res.recordstatus === "รออนุมัติ"
                                                    ?
                                                    <><button 
                                                        onClick={() => approve(res.userid)}
                                                    >
                                                        <BsCheck className="ml-5 text-white rounded-md bg-emerald-700" size={"25px"}></BsCheck>
                                                    </button>
                                                        <button
                                                            onClick={() => withhold(res.userid)}
                                                        >
                                                            <BiX className="ml-4 text-white rounded-md bg-red-700" size={"25px"}></BiX>
                                                        </button></>
                                                    : res.recordstatus !== "ไม่ผ่านการอนุมัติ" ?
                                                        <button
                                                            disabled
                                                        >
                                                            <BsCheck className="ml-4 text-white rounded-md bg-emerald-700/70" size={"25px"}></BsCheck>
                                                        </button>
                                                        : <button disabled>
                                                            <BiX className="ml-4 text-white rounded-sm bg-red-700" size={"25px"} />
                                                        </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <SellerModal isOpen={showModal} onClose={() => setShowModal(false)} seller={seller}   userid={seller.userid}  />
        </Fragment>
    )
}

export default Seller