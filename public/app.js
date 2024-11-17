const form = document.getElementById('transaction-form');
const validateButton = document.getElementById('validateButton');
const resultDiv = document.getElementById('result');
const processedDataDiv = document.getElementById('processedData');
const processedLicense = document.getElementById('processedLicense');
const processedDriver = document.getElementById('processedDriver');
const processedFare = document.getElementById('processedFare');
const processedTimestamp = document.getElementById('processedTimestamp');

// Estado del botón
let isValidated = false;
let lastInvoice = null; // Para almacenar la factura temporalmente

// Evento del botón
validateButton.addEventListener('click', async () => {
    if (!isValidated) {
        // Primera acción: Validar datos
        const licensePlate = document.getElementById('licensePlate').value.trim();
        const driverId = document.getElementById('driverId').value.trim();

        if (!licensePlate || !driverId) {
            resultDiv.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        validateButton.textContent = 'Validando...';
        validateButton.classList.add('disabled');
        validateButton.disabled = true;

        try {
            const response = await fetch('/api/validate-vehicle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ licensePlate, driverId }),
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                // Mostrar datos procesados
                processedLicense.textContent = data.invoice.vehicle;
                processedDriver.textContent = driverId;
                processedFare.textContent = data.invoice.fare;
                processedTimestamp.textContent = new Date(data.invoice.timestamp).toLocaleString();
                console.log("vamos bien..111.",data)

                // Guardar temporalmente la factura
                lastInvoice = data.invoice;

                // Mostrar el contenedor de datos procesados
                processedDataDiv.classList.remove('hidden');

                resultDiv.innerHTML = `<strong>¡Datos validados!</strong>`;
                validateButton.textContent = 'Confirmar Proceso';
                validateButton.classList.remove('disabled');
                validateButton.classList.add('confirm');
                validateButton.disabled = false;
                isValidated = true; // Cambia el estado del botón
console.log("vamos bien..2.",data)

            } else {
                resultDiv.innerHTML = `<strong>Error:</strong> ${data.error}`;
                validateButton.textContent = 'Validar Datos';
                validateButton.classList.remove('disabled');
                validateButton.disabled = false;
            }
        } catch (err) {
            console.error(err);
            resultDiv.textContent = 'Error al conectar con el servidor.';
            validateButton.textContent = 'Validar Datos';
            validateButton.classList.remove('disabled');
            validateButton.disabled = false;
        }
    } else {
        // Segunda acción: Confirmar proceso
        validateButton.textContent = 'Procesando...';
        validateButton.disabled = true;

        try {
            const response = await fetch('/api/confirm-process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    licensePlate: lastInvoice.vehicle,
                    fare: lastInvoice.fare,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                resultDiv.innerHTML = '<strong>Transacción completada con éxito.</strong>';
            } else {
                resultDiv.innerHTML = `<strong>Error:</strong> ${data.error}`;
            }
        } catch (err) {
            console.error(err);
            resultDiv.textContent = 'Error al conectar con el servidor.';
        } finally {
            validateButton.textContent = 'Validar Datos';
            validateButton.classList.remove('confirm');
            validateButton.disabled = false;
            isValidated = false; // Restablece el estado
            lastInvoice = null; // Limpia la factura temporal
        }
    }
});
