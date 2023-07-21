"use client"
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from "next-auth/react";
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link'
import axios from 'axios'
import { FiShoppingCart } from "react-icons/fi";
import { BiCartDownload } from "react-icons/bi";
import Homepagex from '@/components/Homepagex';

// import './globals.css'


const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Admin', href: '/admin', current: false },
  { name: 'Seller', href: '/seller', current: false },
  { name: 'Contact', href: '/contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({})
  const { data: session } = useSession()
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    // loadData(userid)
  }, []);

  const loadData = async (userid) => {
    const response = await axios.get(api + "user/" + userid)
      .then(res => {

        setUser(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      })
  }
  // console.clear()

  return (
    <>


      <nav className="container flex-between w-full mb-16 pt-3 max-w-7xl header ">


        <div className="header ">
          <div className="navbar ">
            <div className="flex-col ">
            </div>
            <div className="menu ">
              <ul><a href='/'>
                <li >หน้าแรก</li></a>
                <Link href='/category'><li>หมวดหมู่</li></Link>
                <li>สั่งซื้อ</li>
                <li>รายการ</li>
                <a href='/contact'><li>ติดต่อ</li></a>
              </ul>

            </div>
            <div className="sm:flex hidden  "  >
            {session?.user.roleId === "user" && (
                <div className="flex items-center gap-3 md:gap-5  ">
                  <Link
                    href={"/cart/"+session?.user.userid }
                    className="btn btn-primary rounded-full navprofile "
                  >
                    <FiShoppingCart className="w-6 h-6 " />
                    <p className='navprofilename'>ตระกร้า</p>

                  </Link>
                  <button
                    
                    type="button"
                    onClick={signOut}
                    className="btn btn-error rounded-full  navprofile btnseller bg-yellow-300"
                  >
                    <BiCartDownload className="w-6 h-6 " />
                    <p className='navprofilename'>ลงทะเบียนขาย</p>
                  </button>

                  {/* <Link href="/profile">
  <Image
    src={session?.user.image}
    width={37}
    height={37}
    className="rounded-full"
    alt="profile"
  />
</Link> */}
                </div>
              ) 
              }

            </div>
            <div className="sm:flex hidden  "  >
            {session?.user.roleId === "seller" &&  (
                <div className="flex items-center gap-3 md:gap-5  ">
                  <Link
                    href={"/cart/"+session?.user.userid }
                    className="btn btn-primary navprofile  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    <FiShoppingCart className="w-6 h-6 " />
                    <p className='navprofilename'>ตระกร้า</p>

                  </Link>
                  <Link
                    type="button"
                    href={session?.user.roleId === 'seller' ? '/seller/addproduct/' + session?.user.userid: '/'  }
                    className="btn btn-error  navprofile btnseller text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    <BiCartDownload className="w-6 h-6 " />
                    <p className='navprofilename'>เพิ่มสินค้า</p>
                  </Link>

                  {/* <Link href="/profile">
  <Image
    src={session?.user.image}
    width={37}
    height={37}
    className="rounded-full"
    alt="profile"
  />
</Link> */}
                </div>
                
              )
              }

            </div>
            <div className="sm:flex hidden  "  >
            {session?.user.roleId === "admin" &&  (
                <div className="flex items-center gap-3 md:gap-5  ">
                  <Link
                     href={"/cart/"+session?.user.userid }
                    className="btn btn-primary  navprofile text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    <FiShoppingCart className="w-6 h-6 " />
                    <p className='navprofilename'>ตระกร้า</p>

                  </Link>
                  <Link
                    type="button"
                    href={session?.user.roleId === 'seller' ? '/seller/addproduct/' + session?.user.userid: '/'  }
                    className="btn btn-error   navprofile btnseller text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    <BiCartDownload className="w-6 h-6 " />
                    <p className='navprofilename '>เพิ่มสินค้า</p>
                  </Link>

                  {/* <Link href="/profile">
  <Image
    src={session?.user.image}
    width={37}
    height={37}
    className="rounded-full"
    alt="profile"
  />
</Link> */}
                </div>
                
              )
              }

            </div>
            {session?.user

              ? (
                <>

                  <Menu as="div" className="">
                    <div>
                      <Menu.Button className="avatar">
                        <span className="sr-only">Open user menu</span>
                        {/* <img
                            className="h-8 w-8 rounded-full"
                            src={session?.user.avatar}
                            alt=""
                          /> */}
                        <img className="shadowavatar w-10 h-10 rounded-full flex" src={session.user?.Avatar} alt={session.user?.username} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                      className="mr-5"
                    >
                      <Menu.Items className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                        <Menu.Item>
                          {({ active }) => (

                            <Link
                              href={session?.user.roleId === 'admin' ? '/admin/manage' : '/' && session?.user.roleId === 'seller' ? '/seller/manage/' + session?.user.userid : '/' && session?.user.roleId === 'user' ? 'user/history/' + session.user.userid : ''}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black-700 ')}

                            >
                              {session?.user.roleId === 'admin' ? 'หน้าแอดมิน' : session?.user.roleId === 'seller' ? 'จัดการสินค้า' : session?.user.roleId === 'user' ? 'ประวัติการทำรายการ' : ''}
                            </Link>

                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={"/account/" + session?.user.userid}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              ตั้งค่าโปรไฟล์
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                            >
                              ออกจากระบบ
                            </a>
                          )}

                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu></>)
              : (
                <Link type="button" href="login" className="login-btn  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => signIn({ callbackUrl: '/', redirect: true })}
                ><PersonIcon />Login</Link>
              )}
          </div>


          <div className="app-text">

            <div className="btn-group">

              <div className="play-btn">

                <i className="fa fa-play" />
              </div>

            </div>
          </div>
        </div>

        <div className="about-services">

        </div>
      </nav>




    </>
  )
}
