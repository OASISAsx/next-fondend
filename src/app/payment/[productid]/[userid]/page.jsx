"use client"
import Modal from '../../../../components/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Popupbuyid = ({ }) => {

  // const userid = session.user.userid;
  const [imageFile, setImageFile] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const api = process.env.API_ENDPOINT;
  const { productid, userid } = useParams();
  // console.log("🚀 ~ file: page.jsx:16 ~ Popupbuyid ~  productid,userid:",  productid,userid)
  const [fromProfile, setFormProfile] = useState({})
  const [item, setItem] = useState({})
  // console.log("🚀 ~ file: page.jsx:19 ~ Popupbuyid ~ item:", item)
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(50.00); // ค่าค่าจัดส่ง Shipping ที่คุณกำหนด (สามารถเปลี่ยนค่าตามต้องการ)
  const { data: session } = useSession()
  const [payment, setPayment] = useState([])
  const [formData, setFormData] = useState([])
  const [error, setError] = useState(null);


  useEffect(() => {
    // loadPayments();
    loadData(userid, productid);
  }, [])
  const loadData = async (userid, productid) => {

    // โหลดข้อมูล userdetail จาก API
    const responseUserDetail = await axios.get(api + 'userdetail/' + userid);
    setFormProfile(responseUserDetail.data)
    console.log("responseUserDetail.data:", responseUserDetail.data)


    // โหลดข้อมูล cart จาก API

    const response = await axios.get(api + "product/" + productid)
      .then(res => {

        setItem(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      });

    // คำนวณราคารวมของสินค้า


    // คำนวณ Total โดยบวกรวม Subtotal และ Shipping (เมื่อ shipping มีค่าที่ต้องการให้กำหนดค่าที่นี่)


  }

  // const loadPayments = async () => {
  //   const response = await axios.get(api + "buydetails")
  //     .then(res => {
  //       setPayment(res.data)
  //       setIsLoaded(true)

  //     }).catch(err => {
  //       setError(err)
  //       // console.log(err);
  //     })
  // }

  const handleChange = (e) => {
    const urlImg = URL.createObjectURL(e.target.files[0]);
    console.log("🚀 ~ file: page.jsx:75 ~ handleChange ~ e.target.files[0]:", e.target.files[0])
    // console.log("🚀 ~ file: Popupbuyid.jsx:63 ~ handleChange ~ urlImg:", urlImg)
    setImageUrl(urlImg);

    if (e.target.name === "file") {
      setImageFile({
        file: e.target.files[0],
      })
      setFormData({
        userid: session?.user.userid,
        payslip: "5555",
        procutid: item.productid,
        byid: item.svcid,
        productname: item.productname,
        prouctprice: item.productprice,
        productdesc: item.productdesc,
        createdby: session?.user.nickname,
      })
    }

  }
  const handleSubmit = async (e) => {
    // console.log(formData)
    // e.preventDefault();

    // Swal.fire({
    //   title: "กำลังอัพโหลดข้อมูล",
    //   html: '<div class="flex-center overflow-y-hidden" id="loading-spinner"></div>',
    //   showConfirmButton: false,
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     render(
    //       <PacmanLoader color="#326bc2" size={60} loading={true} />,
    //       document.getElementById("loading-spinner")
    //     );
    //   },
    // });
    e.preventDefault();
    const response = await axios.post(api + "image", imageFile, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(async resp => {
      // console.log("formData", formData);
      e.preventDefault();

      const postData = await fetch(api + "buydetail", {
        method: 'POST',
        body: JSON.stringify({
          userid: session?.user.userid,
          productid: item.productid,
          byid: item.svcid,
          payslip: resp.data.data.data,
          productname: item.productname,
          productprice: item.productprice,
          productdesc: item.productdesc,
          createdby: session?.user.nickname,
        }),
        headers: { "content-type": "application/json" }
      }).then(res => res.json())
        .then(res => {

          if (res !== null) {
            Swal.fire({
              title: 'ชำระเงินสำเร็จ',
              text: 'กลับไปยังหน้าประวัติการซื้อ',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("/user/history/" + session?.user.userid)
              }
            })
          }
        })
    })

    // const image = { [e.target.name]: e.target.files[0] }

  }

  return (
    <>

     
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm -mt-2">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                            รายละเอียดการชำระ
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST"
                            onSubmit={handleSubmit}
                            encType='multipart/form-data'
                        >

                            <div>
                              
                                <div className="mt-2">
                                    <input
                                        name='ticketprice'
                                        type='text'
                                        defaultValue={item.productname}
                                        onChange={(e) => setFormData(e.target.value)}
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    ประเภทการแสดง
                                </label>
                                <div className="mt-2">
                                    <input
                                        name='tickettype'
                                        type='text'
                                        defaultValue={item.productprice}
                                        onChange={(e) => setFormData(e.target.value)}
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    ชื่อผู้ซื้อ
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={session?.user.nickname}
                                        onChange={(e) => setFormData(e.target.value)}
                                        name='nickname'
                                        type='text'
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 dark:text-white">
                                        รายละเอียด
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        name='ticketdesc'
                                        defaultValue={item.productdesc}
                                        onChange={(e) => setFormData(e.target.value)}
                                        type='text'
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 dark:text-white">
                                            หลักฐานการโอน
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name='file'
                                            accept='image/*'
                                            onInput={(e) => handleChange(e)}
                                            multiple
                                            className="block w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-describedby="file_input_help" id="file_input" type="file" />
                                    </div>
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    ส่งรายการ
                                </button>
                            </div>

                        </form>

                        </div>



    </>
  )
}

export default Popupbuyid