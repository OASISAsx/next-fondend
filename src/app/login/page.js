"use client"
import { signIn } from "next-auth/react"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from "next/link"
import Swal from "sweetalert2"

export default function Login() {
  const { data: session } = useSession()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async (e) => {
    try {
      const res = await signIn("credentials", {
        username,
        password,
      })
    } catch (err) {
      Swal.fire(
        'Username or Password is incorrect',
        'plase try again',
        'warning'
    )
    }
  }

  return (

    <>
      {session?.user
        ? (
          window.location.replace('/')
        )
        : (

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
              {/* <img
                className="mx-auto h-auto w-auto"
                src="Images/logo.png"
                alt="Morlam Ticket"
              /> */}
              <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-black ">
                เข้าสู่ระบบเพื่อใช้งาน
              </h2>
            </div>


            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-black">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
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
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-800">
                ยังไม่มีบัญชี สมัครเข้าใช้งาน?{' '}</p>
              <p className="mt-10 text-center text-sm text-gray-500">
                <Link href="/register" className="w-full bg-green-500 mt-8 mb-4 text-white p-3 rounded-sm font-semibold text-sm">สร้างบัญชีใหม่</Link>
              </p>
            </div>
          </div>
        )
      }

    </>
  )
}
