'use client'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Swal from 'sweetalert2'

const register = () => {
  const api= process.env.API_ENDPOINT
    const [fromData,setFormData] = useState({})
    const [usernameExists, setUsernameExists] = useState(false);
    const [userList, setUserList] = useState([]);

    
    useEffect(() => {
      // ดึงข้อมูลผู้ใช้จาก API และอัพเดต state
      const fetchUserList = async () => {
        try {
          const response = await axios.get(api + "registers");
          setUserList(response.data); // สมมุติว่า API ส่งข้อมูลเป็น array ของผู้ใช้
        } catch (error) {
          console.error("Error fetching user list:", error);
        }
      };
    
      fetchUserList();
    }, []);
    
    const handleSubmit = async(e)=>{
      e.preventDefault();

      // ตรวจสอบว่า username มีในระบบแล้วหรือไม่
      if (usernameExists) {
        Swal.fire({
          icon: "error",
          title: "Username นี้ถูกใช้แล้ว",
          confirmButtonColor: "red",
        });
        return;
      }
      Swal.fire({
        icon:"info",
        title:"ต้องสมัครสมาชิก ?",
        showCancelButton: true,
        confirmButtonColor:"green",
        cancelButtonColor:"#E92F07",
        cancelButtonText:"ต้องการยกเลิก",


        
      }).then(async(result)=>{
        if (result.isConfirmed){

          // e.preventDefaulf()
          await axios.post(api+"register",fromData  )
          .then(async (res)=>{
              console.log(res.data.userid)
              
             const userdetail= await axios.post(api+"userdetail",{userid:res.data.userid})
              .then((res)=>{
                console.log(res)

              })
              
            }).catch(err=>{
                console.log(err=> console.log(err))
              })
              
            Swal.fire({
              icon:"success",
              title:"เสร็จสิ้น",
              confirmButtonColor:"green",
            }).then(()=>{
              window.location.replace('/')
            })
          }
            


      })

    }
    const handleUsernameChange = async (e) => {
      const newUsername = e.target.value;
      
      if (newUsername) {
        const usernamesInSystem = userList.map(user => user.username); // ดึงชื่อผู้ใช้จากข้อมูลผู้ใช้ในระบบ
        setUsernameExists(usernamesInSystem.includes(newUsername));
      } else {
        setUsernameExists(false);
      }
    };
    
    const handleChange = (e)=>{ 
        setFormData({
            ...fromData,
            [e.target.name]: e.target.value

        })
        
    }
    console.log(fromData)
    
  return (
    <>
    {
     
      (

        <div className="flex min-h-full flex-1 flex-col justify-center -mt-14 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
            {/* <img
              className="mx-auto h-auto w-auto"
              src="Images/logo.png"
              alt="Morlam Ticket"
            /> */}
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Register
            </h2>
          </div>


          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST"onSubmit={handleSubmit} >
            <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
          Username
        </label>
        <div className="mt-2">
          <input
            required
            name="username"
            type="text"
            onChange={(e) => {
              handleUsernameChange(e);
              handleChange(e); // เรียกใช้ฟังก์ชัน handleChange เหมือนเดิม
            }}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ${
              usernameExists ? "ring-red-500" : "ring-gray-300"
            } ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:${usernameExists ? "ring-red-600" : "ring-indigo-600"} sm:text-sm sm:leading-6`}
          />
        </div>
        {usernameExists && (
          <p className="mt-2 text-xs text-red-600">Username นี้ถูกใช้แล้ว กรุณาเลือกใหม่</p>
        )}
      </div>
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-black">
                  Nickname
                </label>
                <div className="mt-2">
                  <input
                  required
                    name="nickname"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-black"
                 >
                  
                  
                    Email
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    required
                    name="email"
                    type="email"
                    onChange={(e) => handleChange(e)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-black"
                 >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    
     
                    required
                    name="password"
                    type="password"
                    onChange={(e) => handleChange(e)}
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={usernameExists} // กำหนดให้ปุ่มไม่สามารถกดได้เมื่อ username ซ
                >
                  Register
                </button>
                
              </div>
            </form>
            
          </div>
        </div>
      )
    }

  </>
  )
}

export default register