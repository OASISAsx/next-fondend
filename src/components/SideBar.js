'use client'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'


const SideBar = () => {

  const { data: session } = useSession()

  return (
    <>

  {session?.user.roleId === "seller" &&
  // <div>
  // {/* Component Start */}
  // <div className="max-w-2xl py-2 lg:max-w-none justify-center container " ></div>
  // <div className="flex flex-col items-center w-40 h-full overflow-hidden text-gray-700 bg-gray-100 rounded">
  //   <li className="flex items-center w-full px-3 mt-3" href="#">
  //     <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  //       <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
  //     </svg>
  //     <span className="ml-2 text-sm font-bold">System</span>
  //   </li>
  //   <div className="w-full px-2">
  //     <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
  //     <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="/seller/addproduct">
  //         <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  //         </svg>
  //         <span className="ml-2 text-sm font-medium">AddProducts</span>
  //       </Link>
        
  //       <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
  //         <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  //         </svg>
  //         <span className="ml-2 text-sm font-medium">Search</span>
  //       </a>
  //       <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href={"/seller/manage/"+session?.user.userid}>
  //         <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
  //         </svg>
  //         <span className="ml-2 text-sm font-medium">Manage</span>
  //       </Link>
  //     </div>
  //     <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
        
  //       <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
  //         <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  //         </svg>
  //         <span className="ml-2 text-sm font-medium">Settings</span>
  //       </a>
  //       <a className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
  //         <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  //         </svg>
  //         <span className="ml-2 text-sm font-medium">Messages</span>
  //         <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
  //       </a>
  //     </div>
  //   </div>
  //   <Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300" href="/admin/profile">
  //     <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  //     </svg>
  //     <span className="ml-2 text-sm font-medium">Account</span>
  //   </Link>
  // </div>
  // </div>

  <div className="sidebar flex flex-col items-center w-40 h-full overflow-hidden text-gray-700 bg-gray-100 rounded">
    <li className="flex items-center w-full px-3 mt-3" href="#">
      <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
      </svg>
      <span className="ml-2 text-sm font-bold">System</span>
    </li>
    <div className="w-full px-2">
      <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
      <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href={"/seller/addproduct/"+session?.user.userid}>
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="ml-2 text-sm font-medium">เพิ่มสินค้า</span>
        </a>
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="ml-2 text-sm font-medium">Search</span>
        </a>
        <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href={"/seller/manage/"+session?.user.userid}>
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <span className="ml-2 text-sm font-medium">จัดการสินค้า</span>
        </Link>
      </div>
      <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
        
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href={"/seller/payments/"+session?.user.userid}>
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="ml-2 text-sm font-medium">ชำระเงิน</span>
        </a>
        <a className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span className="ml-2 text-sm font-medium">Messages</span>
          <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
        </a>
      </div>
    </div>
    <Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300" href={"/account/"+session?.user.userid}>
      <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="ml-2 text-sm font-medium">Account</span>
    </Link>
  </div>
  

}
  {session?.user.roleId === "admin" &&
  
  <div className="  sidebar flex-col items-center w-60 h-full overflow-hidden text-gray-700 bg-gray-100 rounded ">
    <li className="flex items-center w-full  px-3 mt-2 " href="#">
      <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
      </svg>
      <span className="ml-2 text-sm font-bold">System</span>
    </li>
    <div className="w-full px-2">
      <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
        <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="/">
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="ml-2 text-sm font-medium">Home</span>
        </Link>
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="/admin/seller">
        <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M8 19H6v-2a3.003 3.003 0 0 1 3-3h5v2H9a1.001 1.001 0 0 0-1 1zm4-6a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2zm8 13a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2zm6 12h-2v-2a1.001 1.001 0 0 0-1-1h-6a1.001 1.001 0 0 0-1 1v2h-2v-2a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3z"/>
    <path fill="currentColor" d="M8 30H4a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h4v2H4v24h4zm20 0h-4v-2h4V4h-4V2h4a2.002 2.002 0 0 1 2 2v24a2.002 2.002 0 0 1-2 2z"/>
</svg>
          <span className="ml-2 text-sm font-medium">ใช้งานการขาย</span>
        </a>
        <Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="/admin/manage">
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
        
          <span className="ml-2 text-sm font-medium">จัดการผู้ใช้</span>
        </Link>
      </div>
      <div className="flex flex-col items-center w-full mt-2 border-t border-gray-300">
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href={"/admin/product/"+session?.user.userid}>
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="ml-2 text-sm font-medium">จัดการสินค้า</span>
        </a>
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="/admin/payment">
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="ml-2 text-sm font-medium">ชำระเงิน</span>
        </a>
        <a className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href={"#"}>
          <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span className="ml-2 text-sm font-medium">Messages</span>
          <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
        </a>
      </div>
    </div>
    <Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300" href={"/admin/account"+session?.user.userid}>
      <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="ml-2 text-sm font-medium">Account</span>
    </Link>
  </div>
  
}
  </>  
  )
  }

export default SideBar