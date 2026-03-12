'use client'
export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaCheckCircle } from 'react-icons/fa'

export default function Home() {
  const [docNumber, setDocNumber] = useState('')
  const [companyCode, setCompanyCode] = useState('')
  const [fiscalYear, setFiscalYear] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const tcode = params.get('Tcode') || '' // รับ Tcode จาก query

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (docNumber && companyCode && fiscalYear) {
      router.push(`/statement?doc=${docNumber}&cc=${companyCode}&year=${fiscalYear}`)
    }
  }

  return (
<div className="max-w-4xl mx-auto p-6 rounded-2xl border border-gray-300 shadow-xl
            relative overflow-hidden bg-gradient-to-b from-gray-100 to-white">

  {/* ขอบบนสีเข้ม */}
  <div className="absolute top-0 left-0 w-full h-2 bg-[#8FB1D7] rounded-t-2xl"></div>

  {/* เนื้อหา */}
  <div className="relative">

    {/* Header */}
    <div className="flex items-center mb-4">
      <Image src="/logo.png" alt="SAP Mockup" width={80} height={80} />
      <span className="ml-2 text-xl font-semibold text-[#000000]">
        {tcode && `${tcode}:`} Change Document: Initial Screen
      </span>
    </div>

    {/* Window ย่อย */}
    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">

      {/* Title bar */}
      <div className="bg-[#D2D5DE] px-3 py-1 font-semibold">
        Keys for Entry View
      </div>

      {/* Content */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
<div className="grid grid-cols-[180px_1fr] gap-3 items-center">

  <label>Document Number</label>
  <input
    type="text"
    value={docNumber}
    onChange={(e) => setDocNumber(e.target.value)}
    className="border rounded p-1 bg-[#FEF0A7]"
  />

  <label>Company Code</label>
  <input
    type="text"
    value={companyCode}
    onChange={(e) => setCompanyCode(e.target.value)}
    className="border rounded p-1 bg-[#FFFFFF]"
  />

  <label>Fiscal Year</label>
  <input
    type="text"
    value={fiscalYear}
    onChange={(e) => setFiscalYear(e.target.value)}
    className="border rounded p-1 bg-[#FFFFFF]"
  />

</div>

        <button
  type="submit"
  className="flex items-center justify-center w-10 h-10 bg-[#76AB37] rounded-full hover:bg-[#76AB37]"
>
  <FaCheck size={20} className="text-white" />
</button>

        </form>
      </div>

    </div>

  </div>
</div>
  )
}
