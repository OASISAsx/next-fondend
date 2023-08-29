'use client'
import Productpopup from '@/components/Productpopup';
import { Link } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const review = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([])
    console.log("🚀 ~ file: page.jsx:15 ~ review ~ item:", item)
    const [userdetail, setuUserdetail] = useState([])
    const [ticket, setTicket] = useState([])
    const api = process.env.API_ENDPOINT;
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // สร้าง state เพื่อเก็บค่า item ที่เลือก
    const [userAvatar, setUserAvatar] = useState([]);
    console.log("🚀 ~ file: page.jsx:22 ~ review ~ setUserAvatar:", setUserAvatar)
    console.log("🚀 ~ file: page.jsx:21 ~ review ~ userAvatar:", userAvatar)


    useEffect(() => {
        loadData();
        loadUser();
        loadTicket();
        loadAvatar();
        console.clear();

    }, [api])



    const loadData = async (productid) => {

        const response = await axios.get(api + "reviews")
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

    const loadUser = async () => {
        const response = await axios.get(api + "registers")
            .then(
                (result) => {
                    setIsLoaded(true);
                    setuUserdetail(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }

    const loadTicket = async () => {
        const response = await axios.get(api + "products")
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTicket(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }
    const loadAvatar = async () => {
        const response = await axios.get(api + "userdetails")
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUserAvatar(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }


    return (
        <>

            {item.map((item, index) => (
                <>
                    {console.clear()}
                    {item.status === true &&
                        <div key={index}>
                            <div className=" container py-9   items-center  justify-between bg-zinc-800/10 rounded-2xl shadow-lg">
                                <div className="sm:mt-0 flex flex-start mb-4 mx-auto">
                                    {userdetail?.map((userdetail, index) => (
                                        <div key={index}>
                                            {userdetail.userid === item.userid &&
                                                <div className='flex mr-auto'>
                                                    {userAvatar[index] ? (
                                                        <img className="shadowavatar w-14 h-14 rounded-full flex" src={userAvatar[index].Avatar} />
                                                    ) : (
                                                        <img className="shadowavatar w-20 h-20 rounded-full flex" src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Futtaradit.cdd.go.th%2Fabout-us%2Fpersonnel%2Fuser-icon-flat-isolated-on-white-background-user-symbol-vector-illustration&psig=AOvVaw0MJpwRX2m7Q0FpODHbb6yt&ust=1693210836467000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMizqIW0_IADFQAAAAAdAAAAABAE"} />
                                                    )}

                                                    <div className="space-y-1 ml-4 text-lg font-medium dark:text-white">
                                                        <p className="block text-md text-slate-800">{userdetail.nickname}</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div className='mr-10 '>
                                    <div className="flex items-center mb-1">
                                        {Array.from({ length: 5 }, (_, index) => (

                                            <svg
                                                key={index}
                                                aria-hidden="true"
                                                className={`w-5 h-5 ${index < item.rvrank ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"

                                            >
                                                <title>Star</title>
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.540 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.380-1.81.588-1.810h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}

                                    </div>

                                    <div className="mb-2  text-sm text-gray-500 dark:text-gray-400"><p>ได้ทำการเขียนรีวิวไว้เมื่อวันที่ {moment(item.createddate).locale('th').format('ll')}</p></div>
                                    {ticket.map((res, index) => (

                                        <div key={index}>
                                            {res.productid === item.productid &&
                                                <p className="text-slate-500 text-md dark:text-gray-400">ชื่อรายการ : {res.productname}</p>
                                            }
                                        </div>
                                    ))}
                                    <p className="text-slate-500 text-sm dark:text-gray-400">คำอธิบาย/รีวิว : {item.rvcomment}</p>
                                    <button onClick={() => {
                                        // เรียกใช้ฟังก์ชันเพื่ออัพเดตค่า rvrank
                                        setSelectedItem(item);
                                        setShowPopup(true);
                                    }}>แสดงรายละเอียด</button>
                                </div>

                                <div className=' p-5 '>


                                    <div className="relative overflow-x-auto  ">
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <div className='ml-5'>
                                                <img src={item.rvimg} alt={item.productname} className="mx-auto h-60 w-80 object-cover rounded-lg" />

                                            </div>
                                        </div>
                                    </div>




                                </div>
                                {/* <br /> */}
                            </div>
                        </div>
                    }
                    <br></br>
                </>
            ))}



        </>
    )
}

export default review