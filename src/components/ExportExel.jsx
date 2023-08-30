"use client"
import { data } from 'autoprefixer';
import React from 'react'
import * as XLSX from 'xlsx';
import { BsFiletypeXlsx } from 'react-icons/bs';


const ExportExel = ({ data, name }) => {

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        XLSX.writeFile(workbook, name + '.xlsx');
    };
    return (
        <div>
           <button type="button" class="flex text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleExport} 
           >Excel<BsFiletypeXlsx size={18}/></button>
        </div>
    )
}

export default ExportExel