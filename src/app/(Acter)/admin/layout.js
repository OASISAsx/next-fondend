"use client";

import SideBar from "../../../components/SideBar";



export default function RootLayout({ children }) {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="flex col-2 sm:ml-2">
            <SideBar />
            <div className="w-full col-2 sm:ml-10 sm:mr-10 ">
            {children}
          </div>
          <div className="col-8">
          </div>
        </div>
        </div>


      </div>
    </>
  )
}
