"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

import Link from 'next/link';
import axios from 'axios';
import ModalCheck from './ModalCheck';


const Productpopup = ({ isOpen,isOpenx, onClose, product, selectedItem }) => {
  if (!isOpen) return null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productImages = [
    ...new Set([product.productimages, product.productimagex, product.productimagey, product.productimagez])
  ];

  const api = process.env.API_ENDPOINT;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpene, setIsOpene] = useState(false);
  const [isOpenex, setIsOpenex] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const [user, setUser] = useState({}); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
  console.log("🚀 ~ file: Productpopup.jsx:25 ~ Productpopup ~ user:", user)

  useEffect(() => {
    if (session) {
      axios.get(api + "userdetail/" + session.user.userid)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [session]);

  const handleOrder = (e) => {

    if (!user.useraddress) {
      // แสดงข้อความแจ้งเตือนให้ผู้ใช้กรอก useraddress ก่อนสั่งซื้อ

      setMessage("กรุณากรอกที่อยู่ก่อนที่จะสั่งซื้อสินค้า");
      setIsOpenex(true);
    } else  {
     
    }
  };
  const handleOrders = (e) => {

    if (!session) {
      // แสดงข้อความแจ้งเตือนให้ผู้ใช้กรอก useraddress ก่อนสั่งซื้อ

      setMessage("กรุณาเข้าสู่ระบบก่อน");
      setIsOpene(true);
    } else {
    }  
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < productImages.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
      <div className="relative w-[80%] h-[80%] rounded-lg">
        <section className="text-gray-700 body-font overflow-hidden bg-white justify-between pop">
          <div className=" px-44 py-10 mx-auto ">
            <div className="lg:w-3/1 mx-auto flex flex-wrap mt-10">
              <div className="absolute left-3 ml-36 top-1/2 transform -translate-y-1/2 h-44">
                <button className="icona contacts  " onClick={handlePreviousImage}>
                  ❮
                </button>
              </div>
              <div className="relative ">

                <img
                  alt="ecommerce"
                  className="h-80 product-show object-contain object-center rounded border border-gray-200"
                  src={productImages[currentImageIndex]}
                />

              </div>
              <div className="absolute right-1/2 mr-28 top-1/2 transform -translate-y-1/2 h-44">
                <button className=" icona contacts" onClick={handleNextImage}>
                  ❯
                </button>
              </div>
              <div className="lg:w-3/5 w-auto lg:pl-20  mt-6  lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.producttype}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 ">{product.productname}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <div className="flex items-center mb-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          aria-hidden="true"
                          className={`w-5 h-5 ${selectedItem && index < selectedItem.rvrank ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'
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

                    <span className="text-gray-600 ml-3">1 Reviews</span>
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
                <p className="leading-relaxed  h-[30%] lg:w-4/4">{product.productdesc}</p>

                <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                    <span className="mr-3 mt-10">เหลือ</span>
                    <div className=" rounded-full mt-10">
                      {product.productstock === "0" ? (
                        <span className="text-red-500 font-semibold">หมด</span>
                      ) : (
                        <span>{product.productstock} ชิ้น</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {product.sellstatus ? (
                    <span className=" text-red-500 text-lg font-semibold">ขายแล้ว</span>
                  ) : (
                    <span className="title-font font-medium text-2xl text-gray-900">{product.productprice}฿</span>
                  )}

{product.sellstatus ? (
  <button
    className="leading-relaxed ml-auto mb-10 flex w-20 justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold text-white shadow-sm cursor-not-allowed"
  >
    <i className="bi bi-cart4 text-sm font-semibold" />
    ซื้อสินค้า
  </button>
) : (
  session ? (
    user.useraddress ? (
      <Link
        href={`/payment/${product.productid}/${session?.user.userid}`}
        className="leading-relaxed ml-auto mb-10 flex w-20 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        <i className="bi bi-cart4 text-sm font-semibold" />
        ซื้อสินค้า
      </Link>
    ) : (
      <button
        className="leading-relaxed ml-auto mb-10 flex w-20 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        onClick={handleOrder}
      >
        <i className="bi bi-cart4 text-sm font-semibold" />
        ซื้อสินค้า
      </button>
    )
  ) : (
    <button
      className="leading-relaxed ml-auto mb-10 flex w-20 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      onClick={handleOrders}
    >
      <i className="bi bi-cart4 text-sm font-semibold" />
      ซื้อสินค้า
    </button>
  )
)}



                </div>


              </div>
            </div>
          </div>

          <Modal isOpenx={isOpenex} setIsOpenx={setIsOpenex} message={message} />
        </section>
          <ModalCheck isOpen={isOpene} setIsOpen={setIsOpene} message={message} />
        <div className="flex-center mt-2">
          <button className='black_btn' onClick={() => onClose()}>ปิดหน้าต่าง</button>
        </div>
          
      </div>
    </div>
  )
}

export default Productpopup