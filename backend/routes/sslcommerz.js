const express = require('express');
const cors = require('cors');
const router = express.Router();

const { sslPayment, sslPaymentNotification, sslPaymentSuccess, sslPaymentCancel, sslPaymentFail } = require('../controllers/sslcommerz');

router.post('/paymentcollection', sslPayment)
router.post('/paymentsuccess', sslPaymentSuccess)
router.post('/paymentfail', sslPaymentFail)
router.post('/paymentcancel', sslPaymentCancel)
router.post('/paymentnotification', sslPaymentNotification)

module.exports = router;