const db = require('./database');

const createTables = async () => {
    try {
        await db.query(`
            CREATE TABLE vehicles (
                id SERIAL PRIMARY KEY,
                license_plate VARCHAR(20) NOT NULL UNIQUE,
                registered_driver VARCHAR(50) NOT NULL,
                preferential_fare DECIMAL(10, 2) NOT NULL,
                default_fare DECIMAL(10, 2) NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE transactions (
                id SERIAL PRIMARY KEY,
                vehicle_id INT REFERENCES vehicles(id),
                fare DECIMAL(10, 2) NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Tablas creadas exitosamente.');
        process.exit(0);
    } catch (err) {
        console.error('Error al crear tablas:', err);
        process.exit(1);
    }
};

createTables();
