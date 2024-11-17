const db = require('./database');

(async () => {
    try {
        const result = await db.query('SELECT NOW() AS current_time');
        console.log('Conexión exitosa:', result.rows[0].current_time);
        process.exit(0);
    } catch (error) {
        console.error('Error en la conexión:', error);
        process.exit(1);
    }
})();
