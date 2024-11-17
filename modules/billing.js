const generateInvoice = (vehicle, fare) => {
    return {
        vehicle: vehicle.license_plate,
        driver: vehicle.registered_driver,
        fare: fare,
        timestamp: new Date().toISOString(),
    };
};

module.exports = { generateInvoice };
