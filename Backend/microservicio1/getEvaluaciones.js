const express = require("express");
const cors = require("cors");
const app = express();

const PUERTO = 3001;

app.use(cors());
app.use(express.json());

// Cargando los datos del json que tengo como base de datos estatica
let evaluacionesJson = require("../api/db.json");

// Funcion para obtener todos los productos de mi json estatico
app.get("/obtenerEvaluaciones", (req, res) => {
  res.json(evaluacionesJson);
});

// Funcion para obtener solo 1 producto dependiendo del ID
app.get("/obtenerEvaluaciones/:id", (req, res) => {
  const evaluacionId = parseInt(req.params.id);

  const evaluacionEncontrada = evaluacionesJson.filter(
    (evaluacion) => evaluacion.id === evaluacionId
  );

  if (evaluacionEncontrada) {
    res.json(evaluacionEncontrada);
  } else {
    res.status(404).json({ mensaje: "Evaluacion no encontrado" });
  }
});

app.listen(PUERTO, () => {
  console.log(`Servidor en ejecución en el puerto ${PUERTO}`);
});
