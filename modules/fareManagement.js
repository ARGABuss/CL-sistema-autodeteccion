const calculateFare = (vehicle) => {
    return vehicle.preferentialFare ? vehicle.preferentialFare : vehicle.defaultFare;
};

module.exports = { calculateFare };
