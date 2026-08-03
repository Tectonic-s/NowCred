'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Mark from '@/components/Mark'
import { SITE } from '@/lib/data/content'

export default function PortalLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)

    if (res?.ok) {
      router.push('/ippo-portal')
      return
    }
    // Deliberately does not say which of the two was wrong.
    setError('That email and password do not match an account.')
  }

  return (
    <div className="portal">
      <div className="center">
        <form className="panel" onSubmit={submit}>
          <div className="wordmark" style={{ marginBottom: '0.25rem' }}>
            <Mark />
            <b>{SITE.wordmark.primary}</b>
            <i>{SITE.wordmark.secondary}</i>
          </div>
          <p className="fineprint">Staff portal</p>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="notice" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn--block" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
