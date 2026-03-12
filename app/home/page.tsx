'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheck } from 'react-icons/fa'

export default function TcodePage() {
  const router = useRouter()
  const [tcode, setTcode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tcode.trim()) {
      router.push(`/codepage?Tcode=${tcode}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-2xl border border-gray-300 bg-[#f0f4f8] shadow-xl relative overflow-hidden">
      {/* ขอบบนสีเข้ม */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#8FB1D7] rounded-t-2xl"></div>

      <div className="relative">
<div className="flex items-center justify-between mb-4">

  {/* ซ้าย */}
  <div className="flex items-center">
    <Image src="/logo.png" alt="SAP Mockup" width={80} height={80} />
    <span className="ml-2 text-xl font-semibold text-[#000000]">
      SAP mockup
    </span>
  </div>

  {/* ขวา */}
  <button
    onClick={() => router.push("/")}
    className="bg-[#FFF0A2] border px-3 py-1 rounded hover:bg-[#FFE37A]"
  >
    Logout
  </button>

</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* ปุ่ม submit อยู่ซ้าย */}
        <button
  type="submit"
  className="flex items-center justify-center w-8 h-8 bg-[#76AB37] rounded-full hover:bg-[#76AB37]"
>
  <FaCheck size={20} className="text-white" />
</button>

            {/* ช่องกรอก Tcode */}
            <input
              type="text"
              value={tcode}
              onChange={(e) => setTcode(e.target.value)}
              placeholder="Enter Tcode"
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center mb-4">
          <img src="/mockProg1.png" alt="SAP Mockup" className="w-full h-auto m-0" />
          </div>
        </form>
      </div>
    </div>

  )
}
