import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'next/navigation';
import { data } from 'autoprefixer';

const Popupbuyid = ({ isOpen, onClose, }) => {
  if (!isOpen) return null;


  const [cartData, setCartData] = useState([]);
  const [isOpene, setIsOpene] = useState(false);
  const [message, setMessage] = useState("");
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams();
  const [fromProfile, setFormProfile] = useState({})
  const [item, setItem] = useState({})
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(50.00); // ค่าค่าจัดส่ง Shipping ที่คุณกำหนด (สามารถเปลี่ยนค่าตามต้องการ)


  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      // โหลดข้อมูล userdetail จาก API
      const responseUserDetail = await axios.get(api + 'userdetail/' + userid);
      setFormProfile(responseUserDetail.data);

      // โหลดข้อมูล cart จาก API
      const responseCart = await axios.get(api + 'cart/' + userid);
      setCartData(responseCart.data);

      // คำนวณราคารวมของสินค้า
      const totalPrice = responseCart.data.reduce((acc, item) => acc + parseFloat(item.productprice), 0);
      setTotalPrice(totalPrice);

      // คำนวณ Total โดยบวกรวม Subtotal และ Shipping (เมื่อ shipping มีค่าที่ต้องการให้กำหนดค่าที่นี่)
      const total = totalPrice + shipping;
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div className=' fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm  '>
      <div className="relative  w-[80%] h-[80%]   rounded-lg  ">
        <section className="text-gray-700 body-font overflow-hidden bg-white  justify-between pop">
          <div className=" px-4 py-10 mx-auto ">
            <div className="ml-20">

              <div>
                <div className=" -mt-10  pt-10  mr-24" >
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                    <div className="rounded-lg md:w-2/3 mb-10">





                      <li>ที่อยู่</li> <br></br>
                      <div className="grid md:grid-cols-2 md:gap-1  ">
                        <div className="block p-2  min-w-fit  text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <span className="text-gray-800 min-w-fit text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">ชื่อผู้ซื้อ:  {fromProfile.fristnameuser}</span>
                          <span className="text-gray-800 text-lg font-medium ml-2 mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 ">{fromProfile.lastnameuser}</span>
                          <br></br>
                          <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300  ">ที่อยู่:  {fromProfile.useraddress} {fromProfile.userzibId} {fromProfile.provinceid}  </span>
                          <span className="text-gray-800 text-lg font-medium ml-2 mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 ">โทร.{fromProfile.userphone}</span>


                        </div>
                      </div><br></br>










                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="message" className="block mt-10  font-medium text-gray-900 dark:text-white">การชำระเงิน</label>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="message" className="block -mb-10 mr-56 font-medium text-gray-900 dark:text-white">แนปสลีปการโอนเงิน</label>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="h-14 max-w-lg object-cover-fit" src="https://blog.loga.app/wp-content/uploads/2019/07/payment.png" alt="image description" />
                          <label className="block mb-2  text- font-medium text-gray-900 dark:text-white" htmlFor="file_input"> </label>
                        <img className="h-40 max-w-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/640px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="image description" />
                          <input className="block w-30 ml-10 flex-box text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                      </div>
                    </div>
                    {/* Sub total */}

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">

                      <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">${parseFloat(totalPrice).toFixed(2)}</p>
                      </div>
                      {cartData.map((item) => (
                        <div>
                          <div className=" flex justify-between">
                            <div className="text-black text-sm font-bold ">{item.productname}</div>
                            <div className="text-black text-sm font-bold ">{item.productprice}฿</div>

                          </div>
                          <div className="text-black text-sm font-bold mb-2">x1</div>
                        </div>))}
                      <hr className="my-1" />
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
                      <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>
        <div className="flex-center mt-2">
          <button className='black_btn' onClick={() => onClose()}>ปิดหน้าต่าง</button>
        </div>

      </div>
    </div>
  )
}

export default Popupbuyid