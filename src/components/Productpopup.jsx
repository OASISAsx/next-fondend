import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

const Productpopup = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const { data: session } = useSession()
  const [isOpene, setIsOpene] = useState(false);
  const [message, setMessage] = useState("");
  const api = process.env.API_ENDPOINT;



  return (
    <div className='modal-portal  fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm  '>
      <div className="relative  w-[80%] h-[80%]   rounded-lg  ">
        <section className="text-gray-700 body-font overflow-hidden bg-white  justify-between pop">
          <div className="container px-4 py-10 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap mt-10">
              <img alt="ecommerce" className=" h-80 object-contain object-center rounded border border-gray-200" src={product.productimages} />

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.producttype}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 ">{product.productname}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.productdesc}</p>

                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                    <span className="mr-3">เหลือ</span>
                    <div className=" rounded-full w-6 h-6 focus:outline-none" >{product.productstock}ชิ้น<div />

                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">{product.productprice}฿</span>
                  <Link
                                    href={'/payment/' + product.productid +'/'+ session?.user.userid}
                                    className="ml-auto mt-2 flex w-28 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    onClick={e => {
                                        // e.preventDefault(item.ticketid);
                                        // console.log(item.ticketid);
                                        // setShowModal(true);
                                    }}
                                >
                                    <i className="bi bi-cart4 text-sm font-semibold mr-1" />
                                    เลือกรายการ
                                </Link>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal isOpen={isOpene} setIsOpen={setIsOpene} message={message} />
        </section>
        <div className="flex-center mt-2">
          <button className='black_btn' onClick={() => onClose()}>ปิดหน้าต่าง</button>
        </div>

      </div>
    </div>
  )
}

export default Productpopup