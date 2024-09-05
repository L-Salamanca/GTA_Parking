document.addEventListener('DOMContentLoaded', () => {
    displayVehicles();
    displayHistory();
    displayParkingSpaces();
    document.getElementById('vehicle-form').addEventListener('submit', addVehicle);
    document.getElementById('set-current-time').addEventListener('click', setCurrentTime);
});

// Función para agregar un vehículo
function addVehicle(event) {
    event.preventDefault();

    const plate = document.getElementById('plate').value;
    const vehicleType = document.getElementById('vehicle-type').value;
    const entryTime = document.getElementById('entry-time').value;
    const space = document.getElementById('space').value;

    // Validación de la placa
    const plateRegex = /^[A-Z]{3}-[0-9]{3}$/;
    if (!plateRegex.test(plate)) {
        alert('Formato de placa inválido. Debe ser de la forma ABC-123.');
        return;
    }

    // Validación del espacio
    if (space < 1 || space > 20) {
        alert('El número de espacio debe estar entre 1 y 20.');
        return;
    }

    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

    // Comprobar si la placa o el espacio ya están ocupados
    const isPlateTaken = vehicles.some(vehicle => vehicle.plate === plate);
    const isSpaceTaken = vehicles.some(vehicle => vehicle.space === space);

    if (isPlateTaken) {
        alert('Ya existe un vehículo con esta placa.');
        return;
    }

    if (isSpaceTaken) {
        alert('El espacio ya está ocupado.');
        return;
    }

    // Agregar el vehículo
    const vehicle = { plate, vehicleType, entryTime, space };
    vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    // Limpiar el formulario
    document.getElementById('vehicle-form').reset();

    // Actualizar la tabla de vehículos actuales
    displayVehicles();
    displayParkingSpaces(); // Actualiza los espacios de estacionamiento
}

// Función para mostrar los vehículos actualmente parqueados
function displayVehicles() {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const vehicleList = document.getElementById('vehicle-list').getElementsByTagName('tbody')[0];

    vehicleList.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const row = vehicleList.insertRow();
        row.insertCell(0).textContent = vehicle.plate;
        row.insertCell(1).textContent = vehicle.vehicleType;
        row.insertCell(2).textContent = vehicle.entryTime;
        row.insertCell(3).textContent = vehicle.space;

        const actionsCell = row.insertCell(4);
        const exitButton = document.createElement('button');
        exitButton.textContent = 'Marcar Salida';
        exitButton.addEventListener('click', () => {
            markExit(index);
        });
        actionsCell.appendChild(exitButton);
    });
}

// Función para marcar la salida de un vehículo
function markExit(index) {
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    const vehicle = vehicles[index];

    if (!vehicle) {
        alert('Vehículo no encontrado.');
        return;
    }

    const exitTime = new Date(); // Hora actual

    // Calcular el tiempo de permanencia en minutos
    const entryTime = new Date(vehicle.entryTime);
    const durationMinutes = Math.floor((exitTime - entryTime) / (1000 * 60)); // Diferencia en minutos

    // Tarifas según el tipo de vehículo
    let costPerMinute;
    if (vehicle.vehicleType === 'moto') {
        costPerMinute = 500;
    } else if (vehicle.vehicleType === 'automovil') {
        costPerMinute = 1000;
    } else if (vehicle.vehicleType === 'camioneta') {
        costPerMinute = 2000;
    } else {
        alert('Tipo de vehículo desconocido.');
        return;
    }

    const totalCost = durationMinutes * costPerMinute;

    // Verificar si los datos son válidos
    if (isNaN(totalCost) || durationMinutes < 0) {
        alert('Error al calcular el costo. Verifique las horas.');
        return;
    }

    // Mostrar el costo
    alert(`El total a pagar por ${durationMinutes} minutos es $${totalCost.toFixed(2)}.`);

    // Actualizar el vehículo con la hora de salida y el costo
    vehicle.exitTime = exitTime.toISOString().slice(0, 16);
    vehicle.totalCost = totalCost.toFixed(2);

    // Guardar el vehículo en el historial
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(vehicle);
    localStorage.setItem('history', JSON.stringify(history));

    // Eliminar el vehículo de la lista activa
    vehicles.splice(index, 1);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    // Actualizar las vistas
    displayVehicles();
    displayHistory(); // Actualizar el historial después de marcar la salida
    displayParkingSpaces(); // Actualiza los espacios de estacionamiento
}

// Función para mostrar el historial de vehículos que han salido
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyList = document.getElementById('history-list').getElementsByTagName('tbody')[0];

    historyList.innerHTML = '';

    history.forEach((vehicle, index) => {
        const row = historyList.insertRow();
        row.insertCell(0).textContent = vehicle.plate;
        row.insertCell(1).textContent = vehicle.vehicleType;
        row.insertCell(2).textContent = vehicle.entryTime;
        row.insertCell(3).textContent = vehicle.exitTime || 'No marcada';
        row.insertCell(4).textContent = vehicle.totalCost ? `$${vehicle.totalCost}` : 'No calculado';

        const actionsCell = row.insertCell(5);
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar Horas';
        editButton.addEventListener('click', () => {
            editVehicleTimes(index);
        });
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar del Historial';
        deleteButton.addEventListener('click', () => {
            deleteFromHistory(index);
        });
        actionsCell.appendChild(deleteButton);
    });
}

// Función para editar la hora de entrada y salida del vehículo en el historial
function editVehicleTimes(index) {
    const history = JSON.parse(localStorage.getItem('history'));
    const vehicle = history[index];

    if (!vehicle) {
        alert('Vehículo no encontrado en el historial.');
        return;
    }

    const newEntryTime = prompt('Editar hora de entrada (YYYY-MM-DDTHH:MM):', vehicle.entryTime);
    if (newEntryTime) {
        vehicle.entryTime = newEntryTime;
    }

    const newExitTime = prompt('Editar hora de salida (YYYY-MM-DDTHH:MM):', vehicle.exitTime || '');
    if (newExitTime) {
        vehicle.exitTime = newExitTime;
    }

    localStorage.setItem('history', JSON.stringify(history));
    displayHistory();
}

// Función para establecer la hora actual en el formulario
function setCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${hours}:${minutes}`;
    document.getElementById('entry-time').value = currentTime;
}

// Función para eliminar un vehículo del historial
function deleteFromHistory(index) {
    const history = JSON.parse(localStorage.getItem('history'));
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    displayHistory();
}

// Función para mostrar el estado de los espacios de estacionamiento
function displayParkingSpaces() {
    const parkingSpacesContainer = document.getElementById('parking-spaces');
    parkingSpacesContainer.innerHTML = '';

    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const occupiedSpaces = vehicles.map(vehicle => vehicle.space);

    for (let i = 1; i <= 20; i++) {
        const button = document.createElement('button');
        button.className = 'parking-space-button ' + (occupiedSpaces.includes(i.toString()) ? 'occupied' : 'free');
        button.title = `Espacio ${i}`;
        parkingSpacesContainer.appendChild(button);
    }
}
