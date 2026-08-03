import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import ExcelJS from 'exceljs'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? ''

  const where: Record<string, unknown> = { deleted: false }
  if (status) where.status = status

  const leads = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 10_000,
  })

  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Leads')

  ws.columns = [
    { header: 'Reference', key: 'referenceId', width: 14 },
    { header: 'Received', key: 'createdAt', width: 20 },
    { header: 'Name', key: 'name', width: 22 },
    { header: 'Phone', key: 'phone', width: 16 },
    { header: 'Email', key: 'email', width: 28 },
    { header: 'Employment', key: 'businessType', width: 20 },
    { header: 'Facility', key: 'facility', width: 26 },
    { header: 'Amount', key: 'loanAmount', width: 20 },
    { header: 'Turnover', key: 'turnover', width: 20 },
    { header: 'Status', key: 'status', width: 14 },
  ]

  // Sand on ink, matching the site.
  ws.getRow(1).eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF222831' } }
    cell.font = { bold: true, color: { argb: 'FFDFD3B8' }, size: 10 }
    cell.alignment = { vertical: 'middle' }
  })
  ws.getRow(1).height = 22

  leads.forEach((l) =>
    ws.addRow({
      referenceId: l.referenceId,
      createdAt: l.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      name: l.name,
      phone: l.phone,
      email: l.email,
      businessType: l.businessType,
      facility: l.facility,
      loanAmount: l.loanAmount,
      turnover: l.turnover,
      status: l.status,
    }),
  )

  const buffer = await wb.xlsx.writeBuffer()
  const today = new Date().toISOString().split('T')[0]

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="ippo-leads-${today}.xlsx"`,
    },
  })
}
