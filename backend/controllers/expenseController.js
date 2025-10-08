const Expense = require('../models/Expense');

// Add expense
exports.addExpense = async (req, res) => {
    try {
        const expense = new Expense({...req.body, user: req.user.id});
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Get expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// Get monthly summary
exports.getMonthlySummary = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        const monthlySummary = {};

        expenses.forEach(exp => {
            const month = new Date(exp.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if(!monthlySummary[month]) monthlySummary[month] = 0;
            monthlySummary[month] += exp.amount;
        });

        res.json(monthlySummary);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};
