'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

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
  const year = params.get('year') || ''

  type Row = { date: string; desc: string; amount: string }
  const [data, setData] = useState<Row[]>([])
  const [reconciled, setReconciled] = useState<boolean[]>([])
  const [unreconciled, setUnreconciled] = useState<boolean[]>([])

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
                    relative overflow-hidden bg-gradient-to-b from-gray-100 to-white select-none">
      {/* แถบบน */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#8FB1D7] rounded-t-2xl"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center mb-4">
          <Image src="/logo.png" alt="SAP Mockup" width={80} height={80} />
          <span className="ml-2 text-xl font-semibold text-[#000000]">
            SAP mockup - {tcode && `${tcode}:`} Line Items
          </span>
        </div>

        {month && year ? (
          <div>
            <p className="mb-4">
              Showing statement for <strong>{monthNames[month]} {year}</strong>
            </p>

            {/* Table */}
            <table className="w-full border text-sm mb-6">
              <thead>
                <tr className="bg-[#D2D5DE]">
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-right">Amount</th>
                  <th className="border p-2 text-center">Reconciled</th>
                  <th className="border p-2 text-center">Unreconciled</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="border bg-[#FFFFFF] p-2">{row.date}</td>
                    <td className="border bg-[#FFFFFF] p-2">{row.desc}</td>
                    <td className="border bg-[#FFFFFF] p-2 text-right">{row.amount}</td>

                    {/* ✅ Reconciled */}
                    <td className="border bg-[#FFFFFF] p-2 text-center">
                      <button
                        onClick={() => toggleReconcile(i)}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-150
                          ${reconciled[i]
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'border-gray-400 bg-white text-transparent'}
                        `}
                      >
                        ✓
                      </button>
                    </td>

                    {/* ❌ Unreconciled */}
                    <td className="border bg-[#FFFFFF] p-2 text-center">
                      <button
                        onClick={() => toggleUnreconcile(i)}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-150
                          ${unreconciled[i]
                            ? 'bg-red-600 border-red-600 text-white'
                            : 'border-gray-400 bg-white text-transparent'}
                        `}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ปุ่มกลับ */}
            <button
              onClick={() => router.push('/')}
              className="bg-[#FFF0A2] text-black px-4 py-2 rounded-md hover:bg-[#FFE97F]"
            >
              Back
            </button>
          </div>
        ) : (
          <p>No period selected.</p>
        )}
      </div>
    </div>
  )
}
