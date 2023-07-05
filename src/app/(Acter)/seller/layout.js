"use client";
import SideBar from '../../../components/SideBar';




export default function RootLayout({ children }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="flex col-2 sm:ml-1">
            <SideBar />
            <div className="w-full sm:ml-10 sm:mr-10 ">
            {children}
            </div>
          </div>
          <div className="">
          </div>
        </div>


      </div>
    </>
  )
}
