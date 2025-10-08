const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, getMonthlySummary } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addExpense);
router.get('/', protect, getExpenses);
router.get('/summary', protect, getMonthlySummary);

module.exports = router;
