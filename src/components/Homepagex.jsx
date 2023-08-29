"use client";
import { Link } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Productpopup from "./Productpopup";

const Homepagex = ({ }) => {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [show, setshow] = useState(false);
  const [product, setproduct] = useState({});
  const [userid, setuserid] = useState({});
  console.log("🚀 ~ file: Homepagex.jsx:13 ~ Homepagex ~ userid:", userid)
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (query === "") {
      loadData()
    } else {
      handleSearch("")
    }
  }, []);


  const loadData = async () => {
    fetch(api + "products")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(prop);
  };


  return (
    <>

<Fragment>
        <form className="w-[50%]">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white " >Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" onChange={handleSearch} value={query} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาสินค้าที่ต้องการ..." required />
            <button type="submit" onClick={() =>  loadData() } className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        <p className="justify-items-start mt-7 ml-10 product text-xl"> สินค้านิยม</p>
        <div className=" container  justify-center  ">

          <div className="product ml-9 mb-20">




            {data.map((item, index) => {
               const isMatch = item.productname.toLowerCase().includes(query.toLowerCase()) 
               
              

             // กรองเฉพาะรายการที่ตรงกับการค้นหา
             if (!isMatch) {
               return null;
             }
             if (item.status === "ลงขายสินค้าสำเร็จ") {
             return (
                <div key={index} >
                  <div className="product-items mt-3">
                    <Link onClick={() => { setshow(true), setproduct(item) }} href={"#/productdetail/" + item.productid} style={{ textDecoration: 'none' }}>
                      <img className=" product-img" src={item.productimages} />
                      <div>

                        <div className="font-bold   text-primary my-3" align="LEFT" valign="top" style={{ fontSize: '1vw ' }}>{item.productname}</div>
                        <div className="pull-right">
                          
                          <div className="font-bold text-xl  text-primary " style={{ fontSize: '1.0vw ' }}  >{item.productstock}ชิ้น</div>


                          {item.sellstatus ? (
                              <span className=" text-red-500 text-l font-semibold">ขายแล้ว</span>
                            ) : (
                              <span className="font-bold text-l text-primary  ">{item.productprice}฿</span>
                            )}
                        </div>
                      </div>
                    </Link>

                  </div>
                </div>
             )
                            }
            })}
          
          </div>




        </div>
        <Productpopup isOpen={show} onClose={() => setshow(false)} product={product} />
      </Fragment>
          
    </>
          
  );
};

export default Homepagex