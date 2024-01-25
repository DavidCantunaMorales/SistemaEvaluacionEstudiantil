import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css";

const GET_API_URL = "http://localhost:3001/obtenerEvaluaciones";
const DELETE_API_URL = "http://localhost:3003/eliminarEvaluacion";

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

  const eliminarProducto = (id) => {
    axios
      .delete(`${DELETE_API_URL}/${id}`)
      .then(() => {
        const nuevaEvaluacion = evaluaciones.filter(
          (evaluacion) => evaluacion.id !== id
        );
        setEvaluaciones(nuevaEvaluacion);
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Evaluaciones</h1>
      <div className="row">
        {evaluaciones.map((evaluacion, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="card h-100" style={{ backgroundColor: "#FCE38A" }}>
              <div className="card-body">
                <h5 className="card-title">Evaluación: {evaluacion.titulo}</h5>
                <p className="card-text">Banco de Preguntas:</p>
                <ul className="list-group">
                  {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
                    <li key={preguntaIndex} className="list-group-item">
                      Pregunta {preguntaIndex + 1}: {pregunta.pregunta}
                      <ul className="list-group">
                        {pregunta.opciones.map((opcion, opcionIndex) => (
                          <li
                            key={opcionIndex}
                            className="list-group-item"
                            style={{ backgroundColor: "#FFDDC1" }}
                          >
                            {String.fromCharCode(97 + opcionIndex)}: {opcion}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => eliminarProducto(evaluacion.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
