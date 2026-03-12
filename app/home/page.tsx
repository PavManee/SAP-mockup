'use client'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaCheckCircle } from 'react-icons/fa'

export default function Home() {
  const router = useRouter()
  const params = useSearchParams()
  const tcode = params.get('Tcode') || '' // รับ Tcode จาก query
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (month && year) {
      router.push(`/statement?month=${month}&year=${year}&Tcode=${tcode}`)
    }
  }

  return (
<div className="max-w-4xl mx-auto p-6 rounded-2xl border border-gray-300 shadow-xl
            relative overflow-hidden bg-gradient-to-b from-gray-100 to-white">
  {/* ขอบบนสีเข้ม */}
  <div className="absolute top-0 left-0 w-full h-2 bg-[#8FB1D7] rounded-t-2xl"></div>

  {/* เนื้อหา */}
  <div className="relative">
    <div className="flex items-center mb-4">
      <Image src="/logo.png" alt="SAP Mockup" width={80} height={80} />
      <span className="ml-2 text-xl font-semibold text-[#000000]">SAP mockup - {tcode && `${tcode}:`} Line Items</span>
    </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full border rounded p-2 bg-[#FEF0A7]"
          >
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2025"
            className="w-full border rounded p-2 bg-[#FEF0A7]"
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
  )
}
