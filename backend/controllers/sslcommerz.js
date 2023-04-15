const SSLCommerzPayment = require('sslcommerz-lts')
const { v4: uuidv4 } = require('uuid');


// main payment function
exports.sslPayment = async (req, res) => {
  const tran_id = "chaudhuree_" + uuidv4();
  amount = 100;

  const data = {
    total_amount: amount,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `http://localhost:${process.env.PORT}/paymentsuccess`,
    fail_url: `http://localhost:${process.env.PORT}/paymentfail`,
    cancel_url: `http://localhost:${process.env.PORT}/paymentcancel`,
    shipping_method: 'No',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'cust@yahoo.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Defaulter Address',
    cus_city: 'Dhaka',
    cus_state: 'Defaulter State',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '00000000000',
    multi_card_name: 'mastercard',
    value_a: 'def001_A',
    value_b: 'def002_B',
    value_c: 'def003_C',
    value_d: 'def004_D',
    ipn_url: `http://localhost:${process.env.PORT}/paymentnotification`,
  };

  const sslcommerz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) //true for live default false for sandbox
  sslcommerz.init(data).then(data => {


    if (data?.GatewayPageURL) {
      console.log(data);
      return res.status(200).redirect(data?.GatewayPageURL);
    }
    else {
      return res.status(400).json({
        message: "Session was not successful"
      });
    }
  });

}


exports.sslPaymentNotification = async (req, res) => {

  return res.status(200).json(
    {
      data: req.body,
      message: 'Payment notification'
    }
  );
}

exports.sslPaymentSuccess = async (req, res) => {


  return res.status(200).json(
    {
      data: req.body,
      message: 'Payment success'
    }
  );
}

exports.sslPaymentFail = async (req, res) => {


  return res.status(200).json(
    {
      data: req.body,
      message: 'Payment failed'
    }
  );
}

exports.sslPaymentCancel = async (req, res) => {

  return res.status(200).json(
    {
      data: req.body,
      message: 'Payment cancelled'
    }
  );
}
