'use client'

import { Suspense } from 'react'
import StatementContent from './StatementContent'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatementContent />
    </Suspense>
  )
}