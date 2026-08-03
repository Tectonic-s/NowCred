'use client'

import { useState, useEffect, useCallback, Fragment } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Mark from '@/components/Mark'
import { SITE, LEAD_STATUSES } from '@/lib/data/content'
import type { Lead } from '@/types'

/** A 500 with an empty body, a proxy error page, or a dropped connection
 *  mid-reload must not take the dashboard down with it. */
const safeJson = (r: Response) => r.json().catch(() => ({}))

function DeleteDialog({
  onConfirm,
  onCancel,
  error,
}: {
  onConfirm: (passphrase: string) => void
  onCancel: () => void
  error: string
}) {
  const [val, setVal] = useState('')

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="del-title">
        <h2 id="del-title">Remove this lead</h2>
        <p style={{ fontSize: 'var(--t-sm)', color: 'var(--muted)' }}>
          It stops appearing in the portal and in exports. The record itself is kept, so this can be
          undone from the database if it was a mistake.
        </p>

        <div className="field">
          <label htmlFor="passphrase">Delete passphrase</label>
          <input
            id="passphrase"
            type="password"
            className="input"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            autoFocus
          />
        </div>

        {error && (
          <p className="notice" role="alert">
            {error}
          </p>
        )}

        <div className="actions" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn--quiet btn--small" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn--danger btn--small"
            type="button"
            disabled={!val}
            onClick={() => val && onConfirm(val)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PortalDashboard() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()

  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState({ total: 0, New: 0, 'In Progress': 0, Closed: 0 })
  const [openId, setOpenId] = useState<number | null>(null)
  const [notes, setNotes] = useState<Record<number, string>>({})
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (filterStatus) params.set('status', filterStatus)

    const data = await fetch(`/api/admin/leads?${params}`).then(safeJson)
    setLeads(data.leads ?? [])
    setTotal(data.total ?? 0)
    setTotalPages(data.totalPages ?? 1)
    setLoading(false)
  }, [page, search, filterStatus])

  const fetchCounts = useCallback(async () => {
    const [all, fresh, progress, closed] = await Promise.all([
      fetch('/api/admin/leads?page=1').then(safeJson),
      fetch('/api/admin/leads?page=1&status=New').then(safeJson),
      fetch('/api/admin/leads?page=1&status=In%20Progress').then(safeJson),
      fetch('/api/admin/leads?page=1&status=Closed').then(safeJson),
    ])
    setCounts({
      total: all.total ?? 0,
      New: fresh.total ?? 0,
      'In Progress': progress.total ?? 0,
      Closed: closed.total ?? 0,
    })
  }, [])

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/ippo-portal/login')
  }, [authStatus, router])

  // Debounced so typing in the search box does not fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(fetchLeads, search ? 250 : 0)
    return () => clearTimeout(t)
  }, [fetchLeads, search])

  useEffect(() => {
    fetchCounts()
  }, [fetchCounts])

  const updateStatus = async (id: number, status: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchCounts()
  }

  const saveNotes = async (id: number) => {
    const value = notes[id] ?? ''
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, notes: value }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes: value } : l)))
  }

  const removeLead = async (id: number, passphrase: string) => {
    const res = await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, delete: true, passphrase }),
    })
    const data = await safeJson(res)

    if (!res.ok) {
      setDeleteError(data.error ?? 'That did not work. Check the passphrase.')
      return
    }

    setLeads((prev) => prev.filter((l) => l.id !== id))
    setOpenId(null)
    setDeleteTarget(null)
    setDeleteError('')
    fetchCounts()
  }

  const exportLeads = async () => {
    const params = new URLSearchParams()
    if (filterStatus) params.set('status', filterStatus)

    const res = await fetch(`/api/admin/leads/export?${params}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ippo-leads-${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggle = (lead: Lead) => {
    setOpenId((prev) => (prev === lead.id ? null : lead.id))
    setNotes((prev) => (lead.id in prev ? prev : { ...prev, [lead.id]: lead.notes ?? '' }))
  }

  const applyFilter = (status: string) => {
    setFilterStatus((prev) => (prev === status ? '' : status))
    setPage(1)
  }

  // Grouped by month, like a ledger — the run of a month is the unit staff think in.
  const grouped = leads.reduce<Record<string, Lead[]>>((acc, lead) => {
    const key = new Date(lead.createdAt).toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
    })
    ;(acc[key] ??= []).push(lead)
    return acc
  }, {})

  if (authStatus === 'loading' || authStatus === 'unauthenticated') {
    return (
      <div className="portal">
        <div className="center">
          <p className="empty">Loading…</p>
        </div>
      </div>
    )
  }

  const tiles = [
    { label: 'All leads', value: counts.total, filter: '' },
    { label: 'New', value: counts.New, filter: 'New' },
    { label: 'In progress', value: counts['In Progress'], filter: 'In Progress' },
    { label: 'Closed', value: counts.Closed, filter: 'Closed' },
  ]

  return (
    <div className="portal">
      {deleteTarget !== null && (
        <DeleteDialog
          error={deleteError}
          onConfirm={(p) => removeLead(deleteTarget, p)}
          onCancel={() => {
            setDeleteTarget(null)
            setDeleteError('')
          }}
        />
      )}

      <header className="portal__bar">
        <div className="portal__bar-inner">
          <div className="wordmark">
            <Mark size={24} />
            <span className="portal__tag">Portal</span>
          </div>
          <div className="actions">
            <span className="fineprint">{session?.user?.email}</span>
            <button
              className="btn btn--quiet btn--small"
              type="button"
              onClick={() => signOut({ callbackUrl: '/ippo-portal/login' })}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="portal__main">
        <div className="stack stack--tight" style={{ marginBottom: '1.75rem' }}>
          <p className="fineprint">Enquiries</p>
          <h1 style={{ fontSize: 'var(--t-2xl)' }}>Everyone who asked.</h1>
        </div>

        {/* Summary before detail — the counts double as filters. */}
        <div className="tiles">
          {tiles.map((t) => (
            <button
              className="tile"
              key={t.label}
              type="button"
              aria-pressed={filterStatus === t.filter && t.filter !== ''}
              onClick={() => applyFilter(t.filter)}
            >
              <b>{t.value}</b>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="toolbar">
          <p className="fineprint">
            {total} {total === 1 ? 'lead' : 'leads'}
            {filterStatus && ` · ${filterStatus}`}
          </p>
          <div className="toolbar__controls">
            <input
              className="input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Name, phone, email, reference…"
              aria-label="Search leads"
            />
            <select
              className="select"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setPage(1)
              }}
              aria-label="Filter by status"
            >
              <option value="">Every status</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button className="btn btn--small" type="button" onClick={exportLeads}>
              Export to Excel
            </button>
          </div>
        </div>

        {loading ? (
          <p className="empty">Fetching…</p>
        ) : leads.length === 0 ? (
          <p className="empty">
            {search || filterStatus ? 'Nothing matches that.' : 'No enquiries yet.'}
          </p>
        ) : (
          Object.entries(grouped).map(([month, monthLeads]) => (
            <section key={month}>
              <div className="monthrule">
                <span>{month}</span>
                <span>
                  {monthLeads.length} {monthLeads.length === 1 ? 'lead' : 'leads'}
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="leads">
                  <thead>
                    <tr>
                      <th scope="col">Ref</th>
                      <th scope="col">Received</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Facility</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthLeads.map((l) => {
                      const isOpen = openId === l.id
                      return (
                        <Fragment key={l.id}>
                          <tr data-open={isOpen}>
                            <td className="ref">{l.referenceId}</td>
                            <td className="num">
                              {new Date(l.createdAt).toLocaleDateString('en-IN')}
                            </td>
                            <td className="who">{l.name}</td>
                            <td className="num">{l.phone}</td>
                            <td>{l.facility}</td>
                            <td>{l.loanAmount || '—'}</td>
                            <td>
                              <span className="pill" data-status={l.status}>
                                {l.status}
                              </span>
                            </td>
                            <td>
                              <div className="rowtools">
                                <select
                                  className="select"
                                  value={l.status}
                                  onChange={(e) => updateStatus(l.id, e.target.value)}
                                  aria-label={`Status for ${l.referenceId}`}
                                >
                                  {LEAD_STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className="btn btn--quiet btn--small"
                                  type="button"
                                  onClick={() => toggle(l)}
                                  aria-expanded={isOpen}
                                >
                                  {isOpen ? 'Close' : 'Open'}
                                </button>
                              </div>
                            </td>
                          </tr>

                          {isOpen && (
                            <tr data-open="true">
                              <td colSpan={8}>
                                <div className="detail">
                                  <section>
                                    <h4>The enquiry</h4>
                                    <dl>
                                      <div>
                                        <dt>City</dt>
                                        <dd>{l.city || '—'}</dd>
                                      </div>
                                      <div>
                                        <dt>Email</dt>
                                        {/* Phone-only enquiries are normal now that the form
                                            no longer requires an address. */}
                                        <dd>{l.email || 'Phone only'}</dd>
                                      </div>
                                      <div>
                                        <dt>What they do</dt>
                                        <dd>{l.businessType || 'Not asked'}</dd>
                                      </div>
                                      <div>
                                        <dt>Turnover</dt>
                                        <dd>{l.turnover || '—'}</dd>
                                      </div>
                                      <div>
                                        <dt>Received</dt>
                                        <dd>{new Date(l.createdAt).toLocaleString('en-IN')}</dd>
                                      </div>
                                    </dl>
                                  </section>

                                  <section>
                                    <h4>What they wrote</h4>
                                    <p style={{ fontSize: 'var(--t-sm)' }}>
                                      {l.message || <span className="muted">Nothing added.</span>}
                                    </p>
                                  </section>

                                  <section>
                                    <h4>Internal notes</h4>
                                    <textarea
                                      className="textarea"
                                      style={{ minHeight: '5.5rem' }}
                                      value={notes[l.id] ?? l.notes ?? ''}
                                      onChange={(e) =>
                                        setNotes((prev) => ({ ...prev, [l.id]: e.target.value }))
                                      }
                                      aria-label={`Internal notes for ${l.referenceId}`}
                                    />
                                    <div className="actions" style={{ justifyContent: 'space-between' }}>
                                      <button
                                        className="btn btn--small"
                                        type="button"
                                        onClick={() => saveNotes(l.id)}
                                      >
                                        Save notes
                                      </button>
                                      <button
                                        className="btn btn--danger btn--small"
                                        type="button"
                                        onClick={() => {
                                          setDeleteTarget(l.id)
                                          setDeleteError('')
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </section>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))
        )}

        {totalPages > 1 && (
          <div className="pager">
            <span className="fineprint">
              Page {page} of {totalPages}
            </span>
            <div className="actions">
              <button
                className="btn btn--quiet btn--small"
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Previous
              </button>
              <button
                className="btn btn--quiet btn--small"
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
