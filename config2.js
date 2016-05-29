var connectionStringExpenses = process.env.DATABASE_URL || 'postgres://postgres:rh871530@localhost:5432/dailyExpense';

module.exports = connectionStringExpenses;
