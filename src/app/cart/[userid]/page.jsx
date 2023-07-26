'use client'
import Popupbuyid from '@/components/Popupbuyid';
import Productpopup from '@/components/Productpopup';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'



const cart = () => {
  const { userid } = useParams();
  const [data, setData] = useState([]);
  const [detail, setdetail] = useState({});
  const [product, setproduct] = useState({});
  console.log("🚀 ~ file: page.jsx:9 ~ cart ~ data:", data)
  const api = process.env.API_ENDPOINT;
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(50.00); // ค่าค่าจัดส่ง Shipping ที่คุณกำหนด (สามารถเปลี่ยนค่าตามต้องการ)
  const [total, setTotal] = useState(0); // เพิ่มตัวแปรสำหรับเก็บค่า Total
  const [show, setshow] = useState(false);
  const [showx, setshowx] = useState(false);



  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await axios.get(api + "cart/" + userid);
      setData(res.data);

      // ตรวจสอบข้อมูลที่ได้รับมาจาก API โดยแสดงค่าใน console
      console.log("Data from API:", res.data);

      // คำนวณยอดรวมราคาสินค้า
      const totalPrice = res.data.reduce((acc, item) => acc + parseFloat(item.productprice), 0);
      setTotalPrice(totalPrice);

      // คำนวณ Total โดยบวกรวม Subtotal และ Shipping
      const total = totalPrice + shipping;
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDelete = async (id) => {
    const res = await axios.delete(api + "cart/" + id)
      .then(res => {
        loadData()

      }).catch(err => console.log(err))
  }

  return (
    <>
      <Fragment>
        <div className="h-[60%] pt-10  " >
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
            <div className="rounded-lg md:w-2/3">
              {data.map((item, index) =>
                <div key={index} onClick={() => { setshow(true), setproduct(item) }} href={"#/productdetail/" + item.productid} style={{ textDecoration: 'none' }} >
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 cartitem  sm:flex sm:justify-start">
                    <img src={item.productimages} className="h-16 w-16 rounded-full sm:h-24 sm:w-24" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{item.productname}</h2>
                        <p className="mt-1 text-xs text-gray-700">{item.producttype}</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">

                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{item.productprice}฿</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDelete(item.cartid);
                            }}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
            {/* Sub total */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">

              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${parseFloat(totalPrice).toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$50</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className>
                  <p className="mb-1 text-lg font-bold">${totalPrice + shipping}</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>

              <button onClick={() => { setshowx(true), setdetail() }} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
          </div>
        </div>
        <Popupbuyid isOpen={showx} onClose={() => setshowx(false)} detail={detail} />
        <Productpopup isOpen={show} onClose={() => setshow(false)} product={product} />
      </Fragment>

    </>
  )
}


export default cart