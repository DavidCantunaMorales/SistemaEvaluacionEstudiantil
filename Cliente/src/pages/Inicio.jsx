import { useState, useEffect } from "react";
import axios from "axios";

const GET_API_URL = "http://localhost:3001/obtener-evaluaciones";

export const Inicio = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener las evaluaciones
    const obtenerEvaluaciones = async () => {
      try {
        const response = await axios.get(GET_API_URL);
        setEvaluaciones(response.data);
      } catch (error) {
        console.error("Error al obtener las evaluaciones:", error);
      }
    };

    // Llamada a la función para obtener evaluaciones al montar el componente
    obtenerEvaluaciones();
  }, []); // El segundo argumento es un array vacío para que useEffect se ejecute solo al montar el componente

  return (
    <div>
      <h1>Datos</h1>
      <ul>
        {evaluaciones.map((evaluacion, index) => (
          <li key={index}>
            <p>Nombre de la Evaluación: {evaluacion.nombre}</p>
            <p>Preguntas:</p>
            <ul>
              {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
                <li key={preguntaIndex}>
                  Pregunta {preguntaIndex + 1}: {pregunta.pregunta}
                  <ul>
                    {pregunta.opciones.map((opcion, opcionIndex) => (
                      <li key={opcionIndex}>
                        Opción {opcionIndex + 1}: {opcion}
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
