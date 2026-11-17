'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from '../component/Login'
import { useAuth } from '../component/AuthProvider'
import { AccountState } from '../component/RoleGate'

export default function LoginPage() {
  const router = useRouter()
  const [changeAccount, setChangeAccount] = useState(false)
  useEffect(() => { setChangeAccount(new URLSearchParams(window.location.search).get('account') === 'change') }, [])
  const { status, profile } = useAuth()
  useEffect(() => {
    if (status === 'authenticated') router.replace(`/${profile.role}/dashboard`)
  }, [status, profile, router])
  if (changeAccount && !['loading', 'authenticated'].includes(status)) return <Login />
  if (status === 'error') return <Login />
  if (['loading', 'missing-profile', 'authenticated'].includes(status)) return <AccountState />
  return <Login />
}
