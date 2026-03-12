'use client'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'

const monthNames: Record<string, string> = {
  "1": "January", "2": "February", "3": "March", "4": "April",
  "5": "May", "6": "June", "7": "July", "8": "August",
  "9": "September", "10": "October", "11": "November", "12": "December"
}

export default function StatementPage() {
  const params = useSearchParams()
  const router = useRouter()
  const month = params.get('month') || ''
  const year = params.get('year') || ''

  return (
    <div className="max-w-3xl mx-auto bg-[#DFEBF7] p-6 rounded-md border border-gray-200">
      <div className="flex items-center mb-4">
        <Image src="/logo.png" alt="SAP Mockup" width={60} height={60} />
        <span className="ml-2 text-xl font-semibold text-[#00000]">Statement</span>
      </div>
      {month && year ? (
        <div>
          <p className="mb-4">
            Showing statement for <strong>{monthNames[month]} {year}</strong>
          </p>
          <table className="w-full border text-sm mb-6">
            <thead>
              <tr className="bg-[#D2D5DA]">
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border bg-[#FBEEA0] p-2">{month}/01/{year}</td>
                <td className="border bg-[#FBEEA0] p-2">Service Fee</td>
                <td className="border bg-[#FBEEA0] p-2 text-right">100</td>
              </tr>
              <tr>
                <td className="border bg-[#FBEEA0] p-2">{month}/15/{year}</td>
                <td className="border bg-[#FBEEA0] p-2">Consulting</td>
                <td className="border bg-[#FBEEA0] p-2 text-right">250</td>
              </tr>
              <tr>
                <td className="border bg-[#FBEEA0] p-2">{month}/20/{year}</td>
                <td className="border bg-[#FBEEA0] p-2">License</td>
                <td className="border bg-[#FBEEA0] p-2 text-right">500</td>
              </tr>
            </tbody>
          </table>

          {/* ปุ่มกลับหน้าแรก */}
          <button
            onClick={() => router.push('/')}
            className="bg-[#8FB0DD] text-black px-4 py-2 rounded-md hover:bg-[#B0C4DC]"
          >
            Back
          </button>
        </div>
      ) : (
        <p>No period selected.</p>
      )}
    </div>
  )
}
