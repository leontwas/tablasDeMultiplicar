const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
