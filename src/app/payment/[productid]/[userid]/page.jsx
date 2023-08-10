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
        producttype: item.producttype,
        productdesc: item.productdesc,
        createdby: session?.user.nickname,
      })
    }

  }
  const handleSubmit = async (e) => {
    // console.log(formData)
    // e.preventDefault();

    let timerInterval
Swal.fire({
  title: 'กำลังกำเนินการสั่งซื้อ!',
  html: 'โหลดข้อมูล  .',
  timer: 2300,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
     
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
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
          productimages:item.productimages,
          producttype: item.producttype,
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

<div className="flex flex-col items-center md:flex-row container mx-auto">
  <div className="md:w-1/2 px-4 -mt-10 ml-52 ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
    </div>
    <form className="space-y-6 mt-10" action="#" method="POST" onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className="w-2/3">
        <label className="block text-sm font-medium leading-6 dark:text-white">
          ชื่อผู้ซื้อ
        </label>
        <input
          defaultValue={session?.user.nickname}
          onChange={(e) => setFormData(e.target.value)}
          name='nickname'
          type='text'
          readOnly
          className="w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="w-2/3 ">
        <label className="block text-sm font-medium leading-6 dark:text-white">
          รายละเอียด
        </label>
        <div className="grid md:grid-cols-1 md:gap-6  ">
                <div className="block p-2  min-w-fit  text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <span className="text-gray-800 min-w-fit text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">ชื่อผู้ซื้อ:  {fromProfile.fristnameuser}</span>
                  <span className="text-gray-800 text-lg font-medium ml-2 mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 ">{fromProfile.lastnameuser}</span>
                  <br></br>
                  <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300  ">ที่อยู่:  {fromProfile.useraddress} {fromProfile.userzibId} {fromProfile.provinceid}  </span>
                  <span className="text-gray-800 text-lg font-medium ml-2 mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 ">โทร.{fromProfile.userphone}</span>


                </div>
                </div>
        
      </div>
      <div className="flex items-center w-56">
  <label
    htmlFor="dropzone-file"
    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
  >
    <img
      src={imageUrl}
      className="absolute inset-0 object-cover w-full h-full opacity-50 image-overlay"
            alt="Uploaded"
    />
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg
        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">คลิ๊กเพื่ออัปโหลดสลีป</span>{" "}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG </p>
    </div>
  

        <input name='file'
          accept='image/*'
          onInput={(e) => handleChange(e)}
          multiple
          className="hidden"
          aria-describedby="file_input_help" id="dropzone-file" type="file"
        />
    </label>
</div> 
{/* {imageUrl && (
  <div className="mt-4 ">
    <h3 className="text-lg font-semibold">รูปภาพสลีปตัวอย่างก่อนที่จะอัปโหลด</h3>
    <img
      src={imageUrl}
      className="mt-2 max-w-full h-60"
    />
  </div>
)} */}
      {/* <div className="w-2/3">
        <label className="block text-sm font-medium leading-6 dark:text-white">
          หลักฐานการโอน
        </label>
        <input
          name='file'
          accept='image/*'
          onInput={(e) => handleChange(e)}
          multiple
          className="w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          aria-describedby="file_input_help" id="file_input" type="file"
        />
      </div> */}
      <br />
      <div className="w-36 ml-100px mt-6 ">
        <button
          type="submit"
          className="w-full mb-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          ส่งรายการ
        </button>
      </div>
    </form>
  </div>
  
  <div className="w-96 px-4 mt-10 md:mb-auto -ml-10">
  <h1 className='text-black text-lg font-bold mb-2'>สแกน qr code เพื่อจ่ายเงิน</h1>
  <img className="h-40 max-w-xs" src="https://www.techopedia.com/wp-content/uploads/2023/03/aee977ce-f946-4451-8b9e-bba278ba5f13.png" alt="image description" />
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">{item.productprice}฿</p>
      </div>

      <div className="flex justify-between text-black font-bold">
        {item.productname}
        <div className="text-black text-sm font-bold ml-auto">
          {item.productprice}฿
        </div>
      </div>
      <div className="text-black text-sm font-bold mb-2">x1</div>
      <hr className="my-1" />
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">50฿</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div>
          <p className="mb-1 text-lg font-bold">${item.productprice + 50}฿</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
    </div> <br></br>
   
  </div>

  
</div>



    </>
  )
}

export default Popupbuyid