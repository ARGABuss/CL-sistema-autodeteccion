const db = require('../database');

const logTransaction = async (invoice) => {
    const result = await db.query(
        'INSERT INTO transactions (vehicle_id, fare) VALUES ($1, $2)',
        [invoice.vehicle_id, invoice.fare]
    );
    console.log('Transacción registrada con éxito:', result.rows[0]);
};

module.exports = { logTransaction };
