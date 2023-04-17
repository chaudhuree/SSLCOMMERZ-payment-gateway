import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'



export default function PaymentStatus() {
  const { status } = useParams()
  const navigate = useNavigate()



  return (
    <div>

      <div className="row ">
        <div className="col-md-6 d-grid justify-content-center" style={{ width: "100%", height: "100vh", placeItems: "center" }}>
        
         <div className='status text-center'> 
         <p className="subtitle">
        you'r payemt status is:
        </p>
         <p className='title'>{status}</p>
         <Link className='footer' to='/'>go back home</Link>
         </div>
        </div>
      </div>

    </div>
  )
}
