const form = document.getElementById('transaction-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const licensePlate = document.getElementById('licensePlate').value.trim();
    const driverId = document.getElementById('driverId').value.trim();

    try {
        const response = await fetch('/api/validate-vehicle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ licensePlate, driverId }),
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `
                <strong>¡Transacción exitosa!</strong><br>
                Matrícula: ${data.invoice.vehicle}<br>
                Tarifa aplicada: $${data.invoice.fare}<br>
                Fecha: ${new Date(data.invoice.timestamp).toLocaleString()}
            `;
        } else {
            resultDiv.innerHTML = `<strong>Error:</strong> ${data.error}`;
        }
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = '<strong>Error:</strong> No se pudo conectar con el servidor.';
    }
});
