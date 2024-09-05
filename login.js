document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previene el comportamiento por defecto del formulario

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Credenciales válidas
            const validUsername = 'marinoreinapotaxie69';
            const validPassword = 'aimep3';

            // Validar credenciales
            if (username === validUsername && password === validPassword) {
                window.location.href = 'principal.html'; // Redirige a la página del parqueadero
            } else {
                document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
            }
        });
    }
});
