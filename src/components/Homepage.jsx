"use client";
import { Link } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";
import Productpopup from "./Productpopup";

const Homepage = () => {
  const [type, setType] = useState("");
  const [data, setdata] = useState([]);
  const { data: session } = useSession()
  const [show, setshow] = useState(false)
  const [product, setproduct] = useState({})
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    if (query === "") {
      loadData()
    } else {
      handleSearch("")
    }
  }, [])

  const loadData = async () => {
    const res = await axios.get("http://localhost:8088/v1/products");
    setdata(res.data);
  };

  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(prop);
  };
  return (
    <>

      <Fragment>
        <div className="flex container ">
          <div className="sidebars -ml-16 ">
            <input type="search" onChange={handleSearch} className="sidebar-search font-semibold" id="" placeholder="ค้นหาสินค้า " />
            <a onClick={() => setType("เครื่องประดับ")} className="sidebar-items font-semibold">
              เครื่องประดับ
            </a>
            <a  onClick={() => setType("รองเท้า")} className="sidebar-items font-semibold">
              รองเท้า
            </a>
            <a  onClick={() => setType("ของโบราณ")} className="sidebar-items font-semibold">
              ของโบราณ
            </a>
            <a onClick={() => setType("ฟิกเกอร์")} className="sidebar-items font-semibold">
              ฟิกเกอร์
            </a>
            <a onClick={() => setType("")} className="sidebar-items font-semibold">
              อื่นๆ
            </a>


          </div>

          <div className="product ml-9">
            {data.map((item, index) => {
              const isMatch =
                item.productname.toLowerCase().includes(query.toLowerCase()) ||
                item.producttype.toLowerCase().includes(query.toLowerCase());

              // กรองเฉพาะรายการที่ตรงกับการค้นหาและประเภทสินค้าที่ผู้ใช้เลือก
              if (!isMatch || (type !== "" && item.producttype !== type)) {
                return null;
              }
              if (item.status === "ลงขายสินค้าสำเร็จ") {
                return (


                  <div key={index}>
                    <div className="product-items ">
                      <Link
                        onClick={() => {
                          setshow(true);
                          setproduct(item);
                        }}
                        to={`/productdetail/${item.productid}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <img className="product-img" src={item.productimages} />
                        <div>
                          <p className="font-bold  text-primary" align="left" valign="top" style={{ fontSize: '1vw' }}>
                            {item.productname}
                          </p>
                          <tr className="pull-right">
                            <td className="font-bold text-xl text-primary" style={{ fontSize: '1.0vw' }}>
                              {item.productstock}ชิ้น
                            </td>
                            <td > {item.sellstatus ? (
                              <span className=" text-red-500 text-l font-semibold">ขายแล้ว</span>
                            ) : (
                              <span className="font-bold text-l text-primary  ">{item.productprice}฿</span>
                            )}</td>
                          </tr>
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

export default Homepage;
