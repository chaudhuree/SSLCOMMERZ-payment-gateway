const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'ammount is not provided'],
  },
  name: {
    type: String,
    required: [true, 'customer name is missing'],
  },
  mobile: {
    type: String,
    required: [true, 'mobile is not provided'],
  },
  transactionId: {
    type: String,
    required: [true, 'transaction id is not provided'],
  },
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true, versionKey: false })

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction