'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (username && password) {
      router.push("/home") // ไปหน้า home
    }
  }

  return (

<div className="min-h-screen flex items-center justify-center bg-[#e5edf5]">

<div className="max-w-md w-full p-6 rounded-2xl border border-gray-300 bg-[#f0f4f8] shadow-xl relative overflow-hidden">

{/* top bar */}
<div className="absolute top-0 left-0 w-full h-2 bg-[#8FB1D7] rounded-t-2xl"></div>

<div className="relative">

{/* logo */}
<div className="flex items-center mb-6">
<Image src="/logo.png" alt="SAP" width={80} height={80} />
<span className="ml-2 text-xl font-semibold">
SAP mockup - Login
</span>
</div>

<form onSubmit={handleLogin} className="space-y-4">

{/* username */}
<div>
<label className="block mb-1">User name</label>
<input
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
className="w-full border rounded p-2 bg-[#FFF7C2]"
/>
</div>

{/* password */}
<div>
<label className="block mb-1">Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full border rounded p-2 bg-[#FFF7C2]"
/>
</div>

{/* button */}
<div className="flex justify-end">

<button
type="submit"
className="bg-[#76AB37] text-white px-4 py-2 rounded"
>
Log in
</button>

</div>

</form>

</div>
</div>
</div>

  )
}