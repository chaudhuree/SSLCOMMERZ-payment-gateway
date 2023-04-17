const express = require('express');
const cors = require('cors');
const router = express.Router();

const { sslPayment, sslPaymentNotification, sslPaymentSuccess, sslPaymentCancel, sslPaymentFail } = require('../controllers/sslcommerz');
const { getAllTransactions, countTransactions, getTransaction } = require('../controllers/transaction');
router.post('/paymentcollection', sslPayment)
router.post('/paymentsuccess', sslPaymentSuccess)
router.post('/paymentfail', sslPaymentFail)
router.post('/paymentcancel', sslPaymentCancel)
router.post('/paymentnotification', sslPaymentNotification)


// transaction details
router.get('/transactions', getAllTransactions);
router.get('/transactions/count', countTransactions);
router.get('/transactions/:id', getTransaction);

module.exports = router;