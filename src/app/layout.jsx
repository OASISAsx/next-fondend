"use client";
import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import Navbar from './Navbar';
import '@fontsource/public-sans';
import { SessionProvider } from "next-auth/react";
import Footer from '@/components/Footer';





export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar />
        
          {children}

          <Footer />
        </body>
      </html>
    </SessionProvider>
  )
}
