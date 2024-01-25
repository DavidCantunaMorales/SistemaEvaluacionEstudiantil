const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const PUERTO = 3002;

app.use(cors());
app.use(express.json());

// Cargando los datos del json que tengo como base de datos estatica
let evaluacionesJson = require("../api/db.json");

// Función para generar un nuevo ID único
const generarId = () => {
  return (
    Math.max(...evaluacionesJson.map((evaluacion) => evaluacion.id), 0) + 1
  );
};

// Funcion para agregar un producto.
app.post("/agregarEvaluacion", (req, res) => {
  const nuevaEvaluacion = { id: generarId(), ...req.body };
  evaluacionesJson.push(nuevaEvaluacion);

  // Convertir la informacion en formato Json para guardar
  const evaluacionesJsonString = JSON.stringify(evaluacionesJson, null, 2);

  // Escribir el JSON actualizado en el archivo
  fs.writeFile(
    "../Backend/api/db.json",
    evaluacionesJsonString,
    "utf8",
    (err) => {
      if (err) {
        console.error("Error al escribir en el archivo:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      // Enviar la respuesta JSON al cliente
      res.json(nuevaEvaluacion);
    }
  );
});

app.listen(PUERTO, () => {
  console.log(`Servidor en ejecución en el puerto ${PUERTO}`);
});
