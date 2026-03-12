'use client'

import { Suspense } from 'react'
import CodePageContent from './CodePageContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CodePageContent />
    </Suspense>
  )
}