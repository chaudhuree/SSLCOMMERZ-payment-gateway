import React from 'react'
import { useParams } from 'react-router-dom'

export default function PaymentStatus() {
  const { status } = useParams()
  return (
    <div>your payment stattus is:{status}</div>
  )
}
