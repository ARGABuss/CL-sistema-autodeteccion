const express = require('express');
const path = require('path');
const db = require('./database');
const fareManagement = require('./modules/fareManagement');
const billing = require('./modules/billing');
const reporting = require('./modules/reporting');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ruta para validar datos del vehículo
app.post('/api/validate-vehicle', async (req, res) => {
    const { licensePlate, driverId } = req.body;

    try {
        // Verificar vehículo en la base de datos
        const vehicleResult = await db.query('SELECT * FROM vehicles WHERE license_plate = $1', [licensePlate]);
        const vehicle = vehicleResult.rows[0];

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehículo no encontrado.' });
        }

        if (vehicle.registered_driver !== driverId) {
            return res.status(403).json({ error: 'El conductor no corresponde al vehículo.' });
        }

        // Calcular tarifa
        const fare = fareManagement.calculateFare(vehicle);

        // Generar factura (no se guarda aún)
        const invoice = billing.generateInvoice(vehicle, fare);

        res.json({ message: 'Validación exitosa.', invoice });
    } catch (error) {
        console.error('Error en la validación:', error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});

// Ruta para confirmar y guardar la transacción
app.post('/api/confirm-process', async (req, res) => {
    const { licensePlate, fare } = req.body;

    try {
        // Buscar vehículo en la base de datos
        const vehicleResult = await db.query('SELECT id FROM vehicles WHERE license_plate = $1', [licensePlate]);
        const vehicle = vehicleResult.rows[0];

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehículo no encontrado.' });
        }

        // Guardar transacción en la base de datos
        await db.query('INSERT INTO transactions (vehicle_id, fare) VALUES ($1, $2)', [vehicle.id, fare]);

        res.json({ message: 'Transacción registrada con éxito.' });
    } catch (error) {
        console.error('Error al guardar la transacción:', error);
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
