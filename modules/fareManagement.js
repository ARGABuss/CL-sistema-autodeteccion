const calculateFare = (vehicle) => {
    return vehicle.preferential_fare ? vehicle.preferential_fare : vehicle.default_fare;
};

module.exports = { calculateFare };
