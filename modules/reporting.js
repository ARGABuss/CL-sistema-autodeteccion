const fs = require('fs');
const path = require('path');

const transactionsPath = path.join(__dirname, '../data/transactions.json');

const logTransaction = (invoice) => {
    const transactions = JSON.parse(fs.readFileSync(transactionsPath, 'utf-8'));
    transactions.push(invoice);
    fs.writeFileSync(transactionsPath, JSON.stringify(transactions, null, 2));
    console.log('Transacción registrada con éxito.');
};

module.exports = { logTransaction };
