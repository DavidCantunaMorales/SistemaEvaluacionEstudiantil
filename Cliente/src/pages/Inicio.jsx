import { useState, useEffect } from "react";
import axios from "axios";

const GET_API_URL = "http://localhost:3001/obtenerEvaluaciones";

export const Inicio = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    axios
      .get(GET_API_URL)
      .then((response) => setEvaluaciones(response.data))
      .catch((error) =>
        console.log("Error al obtener las evaluaciones:", error)
      );
  }, []);

  return (
    <div>
      <h1>Datos</h1>
      <ul>
        {evaluaciones.map((evaluacion, index) => (
          <li key={index}>
            <p>Evaluación: {evaluacion.titulo}</p>
            <p>Banco de Preguntas:</p>
            <ul>
              {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
                <li key={preguntaIndex}>
                  Pregunta {preguntaIndex + 1}: {pregunta.pregunta}
                  <ul>
                    {pregunta.opciones.map((opcion, opcionIndex) => (
                      <li key={opcionIndex}>
                        {String.fromCharCode(97 + opcionIndex)}: {opcion}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
