"use client";
import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/globals.css'
import Navbar from './Header';
import '@fontsource/public-sans';
import { SessionProvider } from "next-auth/react";




export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar />

          {children}

        </body>
      </html>
    </SessionProvider>
  )
}
