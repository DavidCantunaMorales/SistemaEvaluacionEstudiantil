import { useState, useEffect } from "react";
import axios from "axios";

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
        // Filtrar los productos para excluir el producto eliminado
        const nuevaEvaluacion = evaluaciones.filter(
          (evaluacion) => evaluacion.id !== id
        );
        setEvaluaciones(nuevaEvaluacion); // Seteamos los nuevos productos
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

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
            <button onClick={() => eliminarProducto(evaluacion.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
