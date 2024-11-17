const generateInvoice = (vehicle, fare) => {
    return {
        vehicle: vehicle.licensePlate,
        driver: vehicle.registeredDriver,
        fare: fare,
        timestamp: new Date().toISOString(),
    };
};

module.exports = { generateInvoice };
