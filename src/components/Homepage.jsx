"use client";
import { Link } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [type, setType] = useState("");
  const [data, setdata] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  console.log(data);





  const getData = async () => {
    const res = await axios.get("http://localhost:8088/v1/products");
    setdata(res.data);
  };
  return (
    <>
     


      <div className="container ">
        <div className="sidebar ">
          <input type="text" className="sidebar-search" id="simple-search" placeholder="ค้นหาสินค้า " />
          <a onClick={() => setType("เครื่องประดับ")} className="sidebar-items">
            เครื่องประดับ
          </a>
          <a href="#" onClick={() => setType("รองเท้า")} className="sidebar-items ">
            รองเท้า
          </a>
          <a href="#" onClick={() => setType("ของโบราณ")} className="sidebar-items ">
          ของโบราณ
          </a>
          <a onClick={() => setType("ฟิกเกอร์")} className="sidebar-items">
            ฟิกเกอร์
          </a>
          <a onClick={() => setType("")} className="sidebar-items ">
            อื่นๆ
          </a>

        </div>

        <Link className=" mx-auto grid grid-cols-6 gap-x-6  sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ml-6 mr-6  " href="/card">
          {data.map((item, index) => (
            item.producttype.toLowerCase().includes(type.toLowerCase()) &&
            <div className="product object-contain" key={index} >
              <div className="product-items ">
                <img className="product-img" src={item.productimages} />
                <p  style={{ fontSize: '1.2vw ' }}>{item.productname}</p>
                <p stlye="font-size: 1vw;">500</p>
              </div>

            </div>

          ))}
        </Link>



      </div>

    </>
  );
};

export default Homepage;
