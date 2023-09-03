"use client"
import { FaEye, FaSearch, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import PaymentModal from '@/components/PaymentModal';
import { fCurrencyTH } from '@/app/functions/formatNumber';
import CheckSlip from '@/components/CheckSilp';
import Productpopup from '@/components/Productpopup';
import ExportExel from '@/components/ExportExel';
import ExportPdf from '@/components/ExportPdf';


const Payment = () => {
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [detail, setDetail] = useState({});
  const totalSales = item.reduce((total, currentItem) => total + currentItem.productprice, 0);
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    if (userid === undefined) {
      loadData();
    } else {
      loadDataByid(userid);
    }

    return () => {
      clearInterval(timer);
    };
  }, [userid]);


  const loadData = async () => {
    const response = await axios.get(api + "buydetails")
      .then(res => {
        setItem(res.data)
        setCount(res.data.length)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
      })
  }

  const loadDataByid = async (userid) => {
    const response = await axios.get(api + "buydetails/" + userid)
      .then(res => {
        setItem(res.data)
        setCount(res.data.length)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
      })
  }




  // ...

  const updateSellStatusForProduct = async (productid) => {
    try {
      const response = await axios.put(api + "product/status/seller/" + productid, { sellstatus: true });
      const response1 = await axios.put(api + "product/" + productid, { productstock: "0" });
      console.log("Sell status updated for product:", productid);
    } catch (error) {
      console.error("Error updating sell status:", error);
    }
  }

  // ...

  async function handleChangesST(e, payid, productid) {
    const paymentstatus = e.target.value;

    console.log({ paymentstatus }, payid);
    if (paymentstatus === "กำลังจัดส่ง", paymentstatus === "ทำรายการสำเร็จ") {
      updateSellStatusForProduct(productid);
      const updatedProductStock = "0"; // อัพเดทเป็น 0
      axios.put(api + "buydetail/" + payid, { paymentstatus, productstock: updatedProductStock })
        .then(res => {
          if (userid === undefined) {
            loadData()
          } else {
            loadDataByid(userid)
          }
          console.log(handleChangesST)
        })
    } else {
      axios.put(api + "buydetail/" + payid, { paymentstatus })
        .then(res => {
          if (userid === undefined) {
            loadData()
          } else {
            loadDataByid(userid)
          }
          console.log(handleChangesST)
        })
    }
  }

  // ...


  async function handleDelete(payid) {
    Swal.fire({
      title: 'ต้องการลบรายการ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "buydetail/" + payid)
          .then(res => {
            if (userid === undefined) {
              loadData()
            } else {
              loadDataByid(userid)
            }
          })
        Swal.fire(
          'Deleted!',
          'ระบบได้ทำการลบเรียบร้อยแล้ว!',
          'success'
        )
      }
    })
  }

  const handleSearch = async (e) => {
    const prop = e.target.value;
    setQuery(prop);
  };

  const status = [{ value: "กำลังดำเนินการ", color: "bg-info text-white" },
  { value: "ทำรายการสำเร็จ", color: "bg-success  text-white" },
  { value: "กำลังจัดส่ง", color: "bg-success  text-white" },
  { value: "สลิปไม่ถูกต้อง", color: "bg-danger text-white" },
  ]
  const statusseller = [{ value: "กำลังดำเนินการ", color: "bg-info text-white" },
  { value: "กำลังจัดส่ง", color: "bg-success  text-white" },
  { value: "สลิปไม่ถูกต้อง", color: "bg-danger text-white" },
  ]
  return (
    <>
      <Fragment>

        <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 -mt-16 lg:px-8">
          <div className="sm:flex sm:space-x-4">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">จำนวนคำสั่งซื้อ</h3>
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
                    <h3 className="text-sm leading-6 font-medium text-gray-400">ยอดรวมการขาย (ราคา)</h3>
                    <p className="text-3xl font-bold text-black">{fCurrencyTH(totalSales)}฿</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
              <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                    <h3 className="text-sm leading-6 font-medium text-gray-400">เงินที่ได้</h3>
                    {session?.user.roleId === "admin" &&
                      <p className="text-3xl font-bold text-black">{fCurrencyTH(totalSales * 7 / 100)}฿</p>
                    }
                    {session?.user.roleId === "seller" &&
                      <p className="text-3xl font-bold text-black">{fCurrencyTH((totalSales) - totalSales * 7 / 100)}฿</p>
                    }
                    <h3 className="text-sm leading-6 font-medium text-gray-400">รายได้จาก vat 7% จากยอดขายทั้งหมด</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2 -mt-10 '>
          <div className='flex space-x-2'>
            <h2 className="text-2xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">จัดการการชำระเงิน</h2>
            <ExportPdf
              name={"การชำระเงิน"}
              headers={["ไอดีการซื้อ", "ไอดีผู้ใช้", "ไอดีผู้ขาย", "สถานะการซื้อ", "ชื่อรายการ", "ราคา", "ชื่อผู้ซื้อ"]}
              data={item.map(({ payid, userid, byid, paymentstatus, productname, productprice, createdby }) => {
                return [payid, userid, byid, paymentstatus, productname, productprice, createdby]
              })}
            />
            <ExportExel
              name={"การชำระเงิน"}
              data={item}
            />
          </div>
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหาชื่อรายการ" />
            </div>
            <button type="submit" onClick={() => setQuery("")} className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <label>รีเฟรช</label>
            </button>
          </form>
        </div>
        {session?.user.roleId === "admin" &&
          <div className="max-w-2xl py-2 lg:max-w-none justify-center ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อสินค้า
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ผู้ใช้
                    </th>
                    <th scope="col" className="px-6 py-3">
                      เวลาการซื้อ
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                      จำนวน
                    </th>
                    <th scope="col" className="px-6 py-3">
                      สถานะ
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      เลขพัสดุ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จัดการ
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {item.map((res, index) => {
                    const isMatch = res.productname.toLowerCase().includes(query.toLowerCase()) ||
                      res.createdby.toLowerCase().includes(query.toLowerCase()) ||
                      res.paymentstatus.toLowerCase().includes(query.toLowerCase()) ||
                      res.productimages.toLowerCase().includes(query.toLowerCase()) ||
                      res.producttype.toLowerCase().includes(query.toLowerCase()) ||
                      res.productstock.toLowerCase().includes(query.toLowerCase())
                    // กรองเฉพาะรายการที่ตรงกับการค้นหา
                    if (!isMatch) {
                      return null;
                    }
                    return (
                      <tr className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800" key={index}>
                        <td className="w-32 p-4">
                          <img src={res.productimages} />

                        </td>
                        <td className="px-6 py-4">{res.productname}</td>
                        <td className="px-6 py-4">{res.productprice}฿</td>
                        <td className="px-6 py-4">
                          {res.createdby}
                        </td>
                        <td className="px-6 py-4">
                          {moment(res.createddate).locale('th').format('lll' + ' น.')}
                        </td>
                        
                        <td className="px-6 py-4">
                          {res.productstock}
                        </td>
                        <td className="px-6 py-4">
                          <select className="form-select text-white bg-gray-700 rounded-3xl"
                            onChange={(e) => handleChangesST(e, res.payid, res.productid)}

                            value={res.paymentstatus}
                            key={index}
                            readOnly
                          >
                            {status.map((st, index) => (

                              <option readOnly key={index} value={st.value}>{st.value}</option>
                            ))}
                          </select>
                          {/* <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{res.paymentstatus}</span> */}

                        </td>
                        <td>

                          <button className='flex'
                            onClick={() => { setDetail(res), setShowModals(true) }}

                          >เลขพัสดุสินค้า
                            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-.321.169l8.923 5.099l4.016-2.01c-.646-.732-1.688-1.279-3.462-2.21Zm4.17 3.532l-3.998 2V13a.75.75 0 0 1-1.5 0v-2.287l-3.5 1.75v9.441c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978ZM11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286ZM2.96 6.641l9.04 4.52l3.411-1.705l-8.886-5.078l-.103.054c-1.773.93-2.816 1.477-3.462 2.21Z"/>
</svg>
                          </button>


                        </td>
                        <td>

                          <button
                            onClick={() => { setDetail(res), setShowModal(true) }}

                          >
                            <FaSearch className="ml-2 text-sky-600"></FaSearch>
                          </button>

                          <button onClick={() => handleDelete(res.payid)}>
                            <FaTrashAlt className="ml-4 text-danger"></FaTrashAlt>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        }
        {session?.user.roleId === "seller" &&
          <div className="max-w-2xl py-2 lg:max-w-none justify-center ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ชื่อสินค้า
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ผู้ใช้
                    </th>
                    <th scope="col" className="px-6 py-3">
                      เวลาการซื้อ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ประเภท
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จำนวน
                    </th>
                    <th scope="col" className="px-6 py-3">
                      สถานะ
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      แจ้งเลขพัสดุ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จัดการ
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {item.map((res, index) => {
                    const isMatch = res.productname.toLowerCase().includes(query.toLowerCase()) ||
                      res.createdby.toLowerCase().includes(query.toLowerCase()) ||
                      res.paymentstatus.toLowerCase().includes(query.toLowerCase()) ||
                      res.productimages.toLowerCase().includes(query.toLowerCase()) ||
                      res.producttype.toLowerCase().includes(query.toLowerCase()) ||
                      res.productstock.toLowerCase().includes(query.toLowerCase())
                    // กรองเฉพาะรายการที่ตรงกับการค้นหา
                    if (!isMatch) {
                      return null;
                    }
                    return (
                      <tr className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800" key={index}>
                        <td className="px-6 py-4">
                          <img src={res.productimages} className="payment-image" />
                        </td>
                        <td className="px-6 py-4">{res.productname}</td>
                        <td className="px-6 py-4">{res.productprice}฿</td>
                        <td className="px-6 py-4">
                          {res.createdby}
                        </td>
                        <td className="px-6 py-4">
                          {moment(res.createddate).locale('th').format('lll' + ' น.')}
                        </td>
                        <td className="px-6 py-4">
                          {res.producttype}
                        </td>
                        <td className="px-6 py-4">
                          {res.productstock}
                        </td>
                        <td className="px-6 py-4">
                          <select className="form-select text-white bg-gray-700 rounded-3xl"
                            onChange={(e) => handleChangesST(e, res.payid, res.productid)}

                            value={res.paymentstatus}
                            key={index}
                            readOnly
                          >
                            {statusseller.map((st, index) => (

                              <option readOnly key={index} value={st.value}>{st.value}</option>
                            ))}
                          </select>
                          {/* <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{res.paymentstatus}</span> */}

                        </td>
                        <td className='px-12'>

                          <button className='flex items-center mr-10'
                            onClick={() => { setDetail(res), setShowModals(true) }}

                          >
                           <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M5 21q-.825 0-1.413-.588T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675v4.9q-.475-.175-.975-.288T19 11.026q-.825 0-1.588.188T16 11.8V8H8v8l4-2l1.45.725q-.2.525-.325 1.088T13 16.974q0 1.125.4 2.163T14.55 21H5Zm13 0v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2ZM5.4 6h13.2l-.85-1H6.25L5.4 6Z"/>
</svg>
                          </button>


                        </td>
                        <td>

                          <button
                            onClick={() => { setDetail(res), setShowModal(true) }}

                          >
                            <FaSearch className="ml-2 text-sky-600"></FaSearch>
                          </button>

                          <button onClick={() => handleDelete(res.payid)}>
                            <FaTrashAlt className="ml-4 text-danger"></FaTrashAlt>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        }
        <CheckSlip isOpen={showModals} onClose={() => setShowModals(false)} details={detail} payid={detail.payid} />
        <PaymentModal isOpen={showModal} onClose={() => setShowModal(false)} detail={detail} userid={detail.userid} productid={detail.productid} />


      </Fragment>
    </>
  )
}

export default Payment