const Transaction = require("../models/transaction");

// get all transactions
exports.getAllTransactions = async (req, res) => {

  const transactions = await Transaction.find({});

  return res.status(200).json({
    transactions,
  });
};

// count transactions by status=success
exports.countTransactions = async (req, res) => {
  const successCount = await Transaction.countDocuments({ status: "success" });
  const pendingCount = await Transaction.countDocuments({ status: "pending" });
  const faildeCount = await Transaction.countDocuments({ status: "failed" });
  const cancelledCount = await Transaction.countDocuments({ status: "cancelled" });
  return res.status(200).json({
    count: { successCount, pendingCount, faildeCount, cancelledCount }
  });
};

// get transaction by transactionId
exports.getTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({ transactionId: req.params.id });
  return res.status(200).json({
    transaction,
  });
};