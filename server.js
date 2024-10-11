const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Almacenar usuarios
const users = [];

// Ruta de registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (users.find(user => user.username === username)) {
        res.send("El nombre de usuario ya existe. Intente con otro.");
    } else {
        users.push({ username, password });
        res.send("Registro exitoso. Ahora puedes iniciar sesión.");
    }
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.send(`¡Bienvenido, ${username}! Has iniciado sesión exitosamente.`);
    } else {
        res.send("Usuario o contraseña incorrectos.");
    }
});

// Servir archivos estáticos
app.use(express.static('.'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
