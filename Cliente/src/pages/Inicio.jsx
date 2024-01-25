import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

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
    <div className="container-fluid" style={{ backgroundColor: "#573280" }}>
      <h1 className="mb-2" style={{color: "#EDF2EF" }}>Evaluaciones</h1>
      <div className="row">
        {evaluaciones.map((evaluacion, index) => (
          <div key={index} className="col-md-12 mb-3">
            <div className="card" style={{ backgroundColor: "#ACC3A6" }}>
              <div className="card-body">
                <h5 className="card-title mb-1">Nombre de la Evaluación: {evaluacion.nombre}</h5>
                <h5>Preguntas:</h5>
                <div className="row">
                  {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
                    <div key={preguntaIndex} className="col-md-6">
                      <div className="card" style={{ backgroundColor: "#D5DDBC" }}>
                        <div className="card-body">
                            <h5>Pregunta {preguntaIndex + 1}: {pregunta.pregunta}</h5>
                          <ul className="list-group">
                            {pregunta.opciones.map((opcion, opcionIndex) => (
                              <li key={opcionIndex} className="list-group-item">
                                <h5>Opción {opcionIndex + 1}: {opcion}</h5>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
