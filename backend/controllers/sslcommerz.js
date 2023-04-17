const SSLCommerzPayment = require("sslcommerz-lts");
const { v4: uuidv4 } = require("uuid");
const Transaction = require("../models/transaction");

// main payment function
exports.sslPayment = async (req, res) => {
  // console.log(req.body.total_amount);
  const transactionId = "chaudhuree_" + uuidv4();
  const { amount, name, mobile } = req.body;

  // create a database transaction using all datas
  const transaction = await Transaction.create({
    amount: Number(amount),
    name,
    mobile,
    transactionId,
  });

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `https://hatehatejonosheba.onrender.com/paymentsuccess`,
    fail_url: `https://hatehatejonosheba.onrender.com/paymentfail`,
    cancel_url: `https://hatehatejonosheba.onrender.com/paymentcancel`,
    shipping_method: "No",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: name,
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Defaulter Address",
    cus_city: "Dhaka",
    cus_state: "Defaulter State",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: mobile,
    cus_fax: "00000000000",
    multi_card_name: "mastercard",
    value_a: "def001_A",
    value_b: "def002_B",
    value_c: "def003_C",
    value_d: "def004_D",
    ipn_url: `https://hatehatejonosheba.onrender.com/paymentnotification`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  ); //true for live default false for sandbox
  sslcommerz.init(data).then((data) => {
    if (data?.GatewayPageURL) {
      // !: if we just want to use it from backend setup then uncomment these and comment the return res.status(200).json(data?.GatewayPageURL);

      // return res.status(200).redirect(data?.GatewayPageURL);
      // window.location.replace(data?.GatewayPageURL);
      //?: from here we are handling the functionality to fontend. So we are just returning the url

      return res.status(200).json(data?.GatewayPageURL);
    } else {
      return res.status(400).json({
        message: "Session was not successful",
      });
    }
  });
};

exports.sslPaymentNotification = async (req, res) => {
  return res.status(200).json({
    data: req.body,
    message: "Payment notification",
  });
};

exports.sslPaymentSuccess = async (req, res) => {
  // console.log(req.body.tran_id);

  const transaction = await Transaction.findOneAndUpdate(
    { transactionId: req.body.tran_id },
    { status: "success" },
    { new: true }
  );
  // return res.status(200).json({
  //   data: req.body,
  //   message: "Payment success",
  // });
  //note: from the success page i am redirecting it back to the fontend sothat i can show the success message
  return res.status(200).redirect('http://localhost:5173/paymentstatus/successfull');
};

exports.sslPaymentFail = async (req, res) => {
  const transaction = await Transaction.findOneAndUpdate(
    { transactionId: req.body.tran_id },
    { status: "failed" },
    { new: true }
  );
  return res.status(400).redirect("http://localhost:5173/paymentstatus/failed");
};

exports.sslPaymentCancel = async (req, res) => {

  const transaction = await Transaction.findOneAndUpdate(
    { transactionId: req.body.tran_id },
    { status: "cancelled" },
    { new: true }
  );
  return res
    .status(400)
    .redirect("http://localhost:5173/paymentstatus/cancelled");
};
