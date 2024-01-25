const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const PUERTO = 3003;

app.use(cors());
app.use(express.json());

// Cargando los datos del json que tengo como base de datos estatica
let evaluacionesJson = require("../api/db.json");

function actualizarJson() {
  const evaluacionesJsonString = JSON.stringify(evaluacionesJson, null, 2);
  // Escribir el JSON actualizado en el archivo
  fs.writeFile(
    "../Backend/api/db.json",
    evaluacionesJsonString,
    "utf8",
    (err) => {
      if (err) {
        console.error("Error al escribir en el archivo:", err);
      }
    }
  );
}

// Funcion para eliminar un producto
app.delete("/eliminarEvaluacion/:id", (req, res) => {
  const evaluacionId = parseInt(req.params.id);

  evaluacionesJson = evaluacionesJson.filter(
    (evaluacion) => evaluacion.id !== evaluacionId
  );

  actualizarJson();

  res.json({ message: "Evaluacion eliminadoa exitosamente." });
});

app.listen(PUERTO, () => {
  console.log(`Servidor en ejecución en el puerto ${PUERTO}`);
});
