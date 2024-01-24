const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const cors = require("cors");

const app = express();
const PORT = 3001;
const EVALUACIONES_FILE = "evaluaciones.json";

app.use(bodyParser.json());
app.use(cors());

app.get("/obtener-evaluaciones", async (req, res) => {
  try {
    const data = await fs.readFile(EVALUACIONES_FILE, "utf-8");
    const evaluaciones = JSON.parse(data);
    res.status(200).json(evaluaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las evaluaciones." });
  }
});

app.post("/guardar-evaluacion", async (req, res) => {
  try {
    const nuevaEvaluacion = req.body;

    // Lee el archivo actual de evaluaciones (si existe)
    let evaluaciones = [];
    try {
      const data = await fs.readFile(EVALUACIONES_FILE, "utf-8");
      evaluaciones = JSON.parse(data);
    } catch (error) {
      // El archivo podría no existir todavía
    }

    // Agrega la nueva evaluación
    evaluaciones.push(nuevaEvaluacion);

    // Escribe las evaluaciones actualizadas en el archivo
    await fs.writeFile(
      EVALUACIONES_FILE,
      JSON.stringify(evaluaciones, null, 2),
      "utf-8"
    );

    res.status(200).json({ message: "Evaluación guardada con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la evaluación." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
