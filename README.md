# Proyecto de Gestión de Estacionamiento

Este proyecto es una aplicación web para la gestión de un estacionamiento, desarrollado con HTML, CSS y JavaScript. La aplicación permite a los administradores gestionar la entrada y salida de vehículos, ver un historial de vehículos y manejar los espacios de estacionamiento disponibles.

## Características

- **Formulario de Entrada de Vehículos**: Permite registrar la entrada de un vehículo en el estacionamiento. Los campos incluyen:
  - **Placa**: Formato `ABC-123`.
  - **Tipo de Vehículo**: Moto, automóvil o camioneta.
  - **Hora de Entrada**: Puede establecerse manualmente o usar la hora actual.
  - **Espacio**: Número del espacio de estacionamiento (1 a 20).

- **Registro y Gestión de Vehículos Actuales**:
  - Muestra una tabla con los vehículos actualmente estacionados.
  - Permite marcar la salida de un vehículo, calculando automáticamente el costo basado en el tiempo de permanencia y el tipo de vehículo.
  - Actualiza el estado del espacio de estacionamiento a libre cuando se marca la salida.

- **Historial de Vehículos**:
  - Muestra una tabla con los vehículos que han salido del estacionamiento.
  - Permite editar las horas de entrada y salida de los vehículos en el historial.
  - Permite eliminar vehículos del historial.

- **Espacios de Estacionamiento**:
  - Muestra botones representando los espacios de estacionamiento (1 a 20).
  - Los botones indican si el espacio está libre (verde) o ocupado (rojo).

## Implementación

### HTML

El proyecto está estructurado en varias secciones HTML:
- **Formulario de Entrada de Vehículos**: Para registrar nuevos vehículos.
- **Lista de Vehículos Actuales**: Tabla para mostrar vehículos en el estacionamiento.
- **Historial de Vehículos**: Tabla para mostrar el historial de vehículos.
- **Estado de Espacios de Estacionamiento**: Sección que muestra los espacios ocupados y libres.

### CSS

Los estilos se aplican a través de un archivo CSS para mejorar la apariencia de la aplicación:
- **Fuente**: Se utiliza la fuente personalizada `getea` para el texto.
- **Estilos de Botones**: Botones estilizados para el formulario, la tabla de vehículos y el historial.
- **Fondos y Colores**: Se ha añadido un fondo fijo con un video y colores de fondo y texto adecuados para mejorar la legibilidad.

### JavaScript

El código JavaScript maneja la lógica de la aplicación:
- **Agregar Vehículo**: Función para agregar vehículos al estacionamiento, con validaciones para la placa y el espacio.
- **Marcar Salida**: Calcula el costo basado en el tiempo de permanencia y actualiza el historial y el estado del espacio.
- **Editar Horas**: Permite modificar las horas de entrada y salida en el historial.
- **Establecer Hora Actual**: Ajusta el campo de hora de entrada al momento actual.
- **Eliminar del Historial**: Elimina vehículos del historial.
- **Estado de Espacios de Estacionamiento**: Muestra los botones representando los espacios de estacionamiento, indicando si están libres u ocupados.

## Estilos de Espacios de Estacionamiento

El CSS incluye estilos para los botones que representan los espacios de estacionamiento:
- **Botones Libres**: Color verde.
- **Botones Ocupados**: Color rojo.
- **Fondo y Texto**: Fondo y texto de los botones están estilizados para una mejor legibilidad.

## Cómo Ejecutar el Proyecto

1. **Clona el Repositorio**:
   ```bash
   git clone https://github.com/L-Salamanca/GTA_Parking

## Autores
Proyecto creado por Luis Fernando Pérez Salamanca
