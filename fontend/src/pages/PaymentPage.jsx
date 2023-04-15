import axios from "axios";
import React from "react";

export default function PaymentPage() {
  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/paymentcollection", {
      total_amount: 400,
    });
    // console.log(data); // this is the url that we are getting from the backend
    if (data) {
      console.log('Session was successful');

      return window.location.replace(data);
    }
    else {
      // return alert('Session was not successful')
      console.log('Session was not successful');
    }
  };

  return (
    <div>
      <button className="btn btn-outline-primary" onClick={handlePayment}>
        Go To Payment
      </button>
    </div>
  );
}
