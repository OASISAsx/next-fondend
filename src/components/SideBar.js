'use client'
import Link from 'next/link'
import React from 'react'
import { useSession} from 'next-auth/react'



const SideBar = () => {

  const { data: session } = useSession()

 

  return (
    <>

  {session?.user.roleId === "seller" &&
 

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
          <span className="ml-2 text-sm font-medium">หน้าแรก</span>
        </Link>
        <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="/admin/seller">
        <svg width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" d="M7 4C4.8 4 3 5.8 3 8s1.8 4 4 4s4-1.8 4-4s-1.8-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m0 4c-3.9 0-7 1.8-7 4v2h11v-2H2c0-.6 1.8-2 5-2c1.8 0 3.2.5 4 1v-2.2c-1.1-.5-2.5-.8-4-.8M22 4h-7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-6 14h-1V6h1v12m6 0h-4V6h4v12Z"/>
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
        <svg width="512" height="512" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7.5v-2a1 1 0 0 0-1-1H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1H11a1 1 0 0 0 1-1V10M3.84 2L9.51.52a.49.49 0 0 1 .61.36L10.4 2"/>
        <rect width="3.5" height="2.5" x="10" y="7.5" rx=".5"/>
    </g>
</svg>
          <span className="ml-2 text-sm font-medium">ชำระเงิน</span>
        </a>
        
      </div>
    </div>
    <br></br>
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