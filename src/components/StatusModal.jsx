import Link from 'next/link'
import React from 'react'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { BiSolidErrorCircle } from 'react-icons/bi';
import axios from 'axios';

const StatusModal = ({ status, detail }) => {
    console.log("🚀 ~ file: StatusModal.jsx:9 ~ StatusModal ~ status:", status)
    const api = process.env.API_ENDPOINT;
    const handleDelete = async () => {
        axios.delete(api + "sellerdetail/" + detail.userdeid)
            .then(res => {
                window.location.replace("/")
            })
    }
    return (
        <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm' >
            <div className="relative w-[50%] h-[60%] rounded-lg flex flex-col">
                <div className="bg-white p-2 rounded-lg">
                    {status === "ไม่ผ่านการอนุมัติ" && <h1 className='text-center text-2xl'>ข้อมูลไม่ถูกต้อง</h1>}
                    {status === "รออนุมัติ" && <h1 className='text-center text-2xl'>คุณได้ทำการลงทะเบียนขายไปแล้ว</h1>}

                    <div className="flex-center mt-2">
                        {status === "ไม่ผ่านการอนุมัติ" && <p>คุณ{status}กรุณาลองใหม่อีกครั้ง</p>}
                        {status === "รออนุมัติ" && <p>กรุณารอการอนุมัติจากแอดมิน</p>}

                    </div>
                    <div className='flex-center mt-2'>
                        {status === "ไม่ผ่านการอนุมัติ" && <svg  width="150" height="200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ef4444" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.966 9.966 0 0 1-4.262-.951l-4.537.93a1 1 0 0 1-1.18-1.18l.93-4.537A9.965 9.965 0 0 1 2 12Zm8.707-2.707a1 1 0 0 0-1.414 1.414L10.586 12l-1.293 1.293a1 1 0 1 0 1.414 1.414L12 13.414l1.293 1.293a1 1 0 1 0 1.414-1.414L13.414 12l1.293-1.293a1 1 0 1 0-1.414-1.414L12 10.586l-1.293-1.293Z" clip-rule="evenodd"/>
</svg>}
                        {status === "รออนุมัติ" && <svg width="150" height="200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#84cc16" stroke-linecap="round" stroke-width="2">
        <path stroke-linejoin="round" d="M14 19c3.771 0 5.657 0 6.828-1.172C22 16.657 22 14.771 22 11c0-3.771 0-5.657-1.172-6.828C19.657 3 17.771 3 14 3h-4C6.229 3 4.343 3 3.172 4.172C2 5.343 2 7.229 2 11c0 3.771 0 5.657 1.172 6.828c.653.654 1.528.943 2.828 1.07"/>
        <path stroke-linejoin="round" d="m9 11l2.25 2L15 9"/>
        <path d="M14 19c-1.236 0-2.598.5-3.841 1.145c-1.998 1.037-2.997 1.556-3.489 1.225c-.492-.33-.399-1.355-.212-3.404L6.5 17.5"/>
    </g>
</svg>}
                    </div>
                    <div className="flex-center mt-4">
                        {status === "ไม่ผ่านการอนุมัติ" && <button className='black_btn' onClick={handleDelete}>กลับไปยังหน้าแรก</button>}
                        {status === "รออนุมัติ" &&<button className='black_btn' onClick={() => window.location.replace("/")}>กลับไปยังหน้าแรก</button>}
                        {status === undefined &&<button className='black_btn' onClick={() => window.location.replace("/")}>กลับไปยังหน้าแรก</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusModal