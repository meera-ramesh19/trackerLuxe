const asyncHandler = require('express-async-handler');
const moment = require('moment');
const Transaction = require('../models/transactionModel');

// // @desc    Get transactions
// // @route   GET /api/transactions

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200).json(transactions);

  // res.status(200).json({ messge: 'get transactions' });
});

// // @desc    Get transactions
// // @route   GET /api/transactions

const singleTransactions = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  console.log(transaction);
  res.status(200).json(transaction);

  // res.status(200).json({ messge: 'get transactions' });
});

// // @desc    Set transaction
// // @route   POST /api/transactions
const setTransaction = asyncHandler(async (req, res) => {
  console.log(req.body)
  if (!req.body.itemName) {
    res.status(400);
    throw new Error('Please add a text field');
  } else if (!req.body.amount) {
    res.status(400);
    throw new Error('Please enter a number');
  } else if (!req.body.userDate) {
    res.status(400);
    throw new Error('Please enter a date');
  } else if (!req.body.category) {
    throw new Error('Please add a text field');
  } else if (!req.body.from) {
    throw new Error('Please add a text field');
  } else if (!req.body.sourcetype) {
    throw new Error('Please add a text field');
  }

  const transaction = await Transaction.create({
    itemName: req.body.itemName,
    amount: req.body.amount,
    userDate: req.body.userDate,
    from: req.body.from,
    category: req.body.category,
    sourcetype: req.body.sourcetype,
  });

  res.status(200).json(transaction);
  // res.status(200).json({ messge: 'set transactions' });
});

// // @desc    Update transaction
// // @route   PUT /api/transactions/:id
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(400);
    throw new Error('Transaction not found');
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTransaction);
  //  res.status(200).json({ messge: `update transactions ${req.params.id}` });
});

// // @desc    Delete transaction
// // @route   DELETE /api/transactions/:id

const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(400);
    throw new Error('Transaction not found');
  }
  await transaction.remove();
  res.status(200).json({ id: req.params.id });
  //res.status(200).json({ messge: `update transactions ${req.params.id}` });
});

module.exports = {
  getTransactions,
  singleTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
};
