const vehicles = require('../data/vehicles.json');

const identifyVehicle = async (licensePlate) => {
    return vehicles.find(vehicle => vehicle.licensePlate === licensePlate) || null;
};

const validateDriver = async (vehicle, driverId) => {
    return vehicle.registeredDriver === driverId;
};

module.exports = { identifyVehicle, validateDriver };
