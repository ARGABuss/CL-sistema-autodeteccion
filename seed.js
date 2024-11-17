const db = require('./database');

const seedDatabase = async () => {
    try {
        await db.query(`
            INSERT INTO vehicles (license_plate, registered_driver, preferential_fare, default_fare)
            VALUES
            ('ABC123', 'D12345', 50, 100),
            ('XYZ789', 'D67890', 45, 90);
        `);

        console.log('Base de datos inicializada correctamente.');
        process.exit(0);
    } catch (err) {
        console.error('Error al poblar la base de datos:', err);
        process.exit(1);
    }
};

seedDatabase();
