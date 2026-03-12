'use client'

export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FaPaperclip } from "react-icons/fa"


const monthNames: Record<string, string> = {
  "1": "January", "2": "February", "3": "March", "4": "April",
  "5": "May", "6": "June", "7": "July", "8": "August",
  "9": "September", "10": "October", "11": "November", "12": "December"
}

export default function StatementPage() {
  const params = useSearchParams()
  const router = useRouter()
  const tcode = params.get('Tcode') || ''
  const month = params.get('month') || ''
  const docNumber = params.get('doc') || ''
  const companyCode = params.get('cc') || ''
  const fiscalYear = params.get('year') || ''

  type Row = Record<string, any>
  const [data, setData] = useState<Row[]>([])
  const [reconciled, setReconciled] = useState<boolean[]>([])
  const [unreconciled, setUnreconciled] = useState<boolean[]>([])
  const [open, setOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(false)
    const [showTable, setShowTable] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  const openFile = () => {
    fileRef.current?.click()
  }

  useEffect(() => {
    fetch('/statement-data.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setReconciled(new Array(json.length).fill(false))
        setUnreconciled(new Array(json.length).fill(false))
      })
      .catch(err => console.error("Fetch error:", err))
  }, [])

  const toggleReconcile = (index: number) => {
    setReconciled(prev => {
      const updated = [...prev]
      updated[index] = !updated[index]
      return updated
    })
    // ถ้าติ๊ก Reconciled → ยกเลิกติ๊ก Unreconciled
    setUnreconciled(prev => {
      const updated = [...prev]
      if (updated[index]) updated[index] = false
      return updated
    })
  }

  const toggleUnreconcile = (index: number) => {
    setUnreconciled(prev => {
      const updated = [...prev]
      updated[index] = !updated[index]
      return updated
    })
    // ถ้าติ๊ก Unreconciled → ยกเลิกติ๊ก Reconciled
    setReconciled(prev => {
      const updated = [...prev]
      if (updated[index]) updated[index] = false
      return updated
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-2xl border border-gray-300 shadow-xl
                    relative overflow-hidden bg-gradient-to-b from-gray-100 to-white select-none min-h-[75vh] flex flex-col">
      {/* แถบบน */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#8FB1D7] rounded-t-2xl "></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center mb-4">
          <Image src="/logo.png" alt="SAP Mockup" width={80} height={80} />
          <span className="ml-2 text-xl font-semibold text-[#000000]">
            Change Document: Data Entry View
          </span>
        </div>

<div className="relative inline-block mb-4">

<button
onClick={() => setOpen(!open)}
className="bg-[#E7C46A] px-3 py-1 border shadow"
>
Create...
</button>


{open && (

<div className="absolute top-full left-0 w-56 bg-[#F4F4F4] border shadow">

<div
className="px-3 py-2 hover:bg-[#E7C46A] flex justify-between cursor-pointer"
onMouseEnter={() => setSubOpen(true)}
onMouseLeave={() => setSubOpen(false)}
>

Create...
▶


{subOpen && (

<div className="absolute left-full top-0 w-64 bg-[#F4F4F4] border shadow">

<div
className="px-3 py-2 hover:bg-[#E7C46A] cursor-pointer"
onClick={openFile}
>
Create Attachment
</div>

<div className="px-3 py-2 hover:bg-[#E7C46A]">
Create note
</div>

<div className="px-3 py-2 hover:bg-[#E7C46A]">
Create external document
</div>

</div>

)}

</div>

<div className="px-3 py-2 hover:bg-[#E7C46A]">
Attachment list
</div>

</div>

)}

<input
  type="file"
  ref={fileRef}
  className="hidden"
  onChange={(e) => {
    const f = e.target.files?.[0]

    if (f) {
      setShowTable(true)
      setShowSuccess(true)

      setOpen(false)
      setSubOpen(false)

      e.target.value = ""
    }
  }}
/>

</div>
{showSuccess && (
  <div className="mb-4 p-2 bg-green-200 border border-green-500 text-green-900 rounded">
    Submit attachment successfully
  </div>
)}

{docNumber && companyCode && fiscalYear && (

<div className="mb-4 border rounded overflow-hidden">

  <div className="bg-[#D2D5DE] px-3 py-1 font-semibold">
    Document Data
  </div>

  <div className="p-5 grid grid-cols-3 gap-6 text-base bg-white">

    <div>
      <div className="text-gray-600 mb-1">Document Number</div>
      <div className="border bg-[#FFFFFF] p-2 h-10 flex items-center">
        {docNumber}
      </div>
    </div>

    <div>
      <div className="text-gray-600 mb-1">Company Code</div>
      <div className="border bg-[#FFFFFF] p-2 h-10 flex items-center">
        {companyCode}
      </div>
    </div>

    <div>
      <div className="text-gray-600 mb-1">Fiscal Year</div>
      <div className="border bg-[#FFFFFF] p-2 h-10 flex items-center">
        {fiscalYear}
      </div>
    </div>

  </div>

</div>

)}


        {docNumber && companyCode && fiscalYear && showTable ?(
          <div>
            <p className="mb-4">Data Selected</p>

            {/* Table */}
            <table className="w-full border text-sm mb-6">
              <thead>
                <tr className="bg-[#D2D5DE]">
                  <th className="border p-2 text-left">CoCd</th>
                  <th className="border p-2 text-left">Item</th>
                  <th className="border p-2 text-right">PK</th>
                  <th className="border p-2 text-left">Account</th>
                  <th className="border p-2 text-left">Assignment</th>
                  <th className="border p-2 text-right">Description</th>
                  <th className="border p-2 text-left">Text</th>
                  <th className="border p-2 text-left">Amount</th>
                  <th className="border p-2 text-right">CostCenster</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="border bg-[#FFFFFF] p-2">{row.CoCd}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.Item}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.PK}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.Account}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.Assignment}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.Description}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.Text}</td>
                    <td className="border bg-[#FFFFFF] p-2 text-right">{row.Amount}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.CostCenster}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p></p>
        )} 
      </div>
{/* ปุ่มกลับ */}

<div className="mt-auto pt-6">
  <button
    onClick={() => router.push('/')}
    className="bg-[#FFF0A2] px-4 py-2 rounded"
  >
    Back
  </button>
</div>
    </div>
  )
}
