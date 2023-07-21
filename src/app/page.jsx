
import Homepagex from '@/components/Homepagex'
import React from 'react'


const Home = () => {
  return (
    <>
    
    
    <section    className="w-full flex-center flex-col body "><br/>
        <h1 className="head_text text-center mt-10 "> 
          ร้านซื้อขายของสะสมออนไลน์
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">Wave Shop</span>
        </h1>
        <p className="desc text-center">
          เมื่อสั่งของออนไลน์กับเราแล้ว
          คุณมั่นใจได้ว่าร้านค้าจะจัดส่งสินค้าอย่างรวดเร็ว ทันใจ ไม่ต้องรอนาน
          ซึ่งคุณสามารถเลือกรูปแบบบริการจัดส่งได้หมด ส่งได้ทั่วประเทศไทย
          และติดตามการจัดส่งได้อย่างง่ายดาย
        </p > <br/>
      
    <Homepagex/>
      </section>
  
    </>
  )
}

export default Home