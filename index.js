const express = require('express');
const path = require('path');
const vehicleDetection = require('./modules/vehicleDetection');
const fareManagement = require('./modules/fareManagement');
const billing = require('./modules/billing');
const reporting = require('./modules/reporting');

const app = express();
const PORT = 3000;

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ruta para verificar vehículo
app.post('/api/validate-vehicle', async (req, res) => {
    const { licensePlate, driverId } = req.body;

    const vehicle = await vehicleDetection.identifyVehicle(licensePlate);
    if (!vehicle) {
        return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    const isValid = await vehicleDetection.validateDriver(vehicle, driverId);
    if (!isValid) {
        return res.status(403).json({ error: 'Conductor no válido' });
    }

    const fare = fareManagement.calculateFare(vehicle);
    const invoice = billing.generateInvoice(vehicle, fare);

    reporting.logTransaction(invoice);
    res.json({ message: 'Transacción completada', invoice });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
