const db = require('../database');

const identifyVehicle = async (licensePlate) => {
    const result = await db.query('SELECT * FROM vehicles WHERE license_plate = $1', [licensePlate]);
    return result.rows[0] || null;
};

const validateDriver = async (vehicle, driverId) => {
    return vehicle.registered_driver === driverId;
};

module.exports = { identifyVehicle, validateDriver };
