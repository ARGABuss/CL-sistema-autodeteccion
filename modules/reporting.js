const db = require('../database');

const logTransaction = async (invoice) => {
    await db.query(
        'INSERT INTO transactions (vehicle_id, fare) VALUES ($1, $2)',
        [invoice.vehicle.id, invoice.fare]
    );
    console.log('Transacción registrada con éxito.');
};

module.exports = { logTransaction };
