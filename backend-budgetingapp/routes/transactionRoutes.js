const express = require('express');
const router = express.Router();

const {
  getTransactions,
  singleTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

router.get('/', getTransactions);
router.get('/:id', singleTransactions);
router.post('/', setTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
