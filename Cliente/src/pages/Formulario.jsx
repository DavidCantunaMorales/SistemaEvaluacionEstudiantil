import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Formulario.css"; // Agrega tu archivo de estilos personalizados si es necesario

const POST_API_URL = "http://localhost:3002/agregarEvaluacion";

export const Formulario = () => {
  const [evaluacion, setEvaluacion] = useState({
    titulo: "",
    preguntas: [],
  });

  const handleNombreChange = (e) => {
    setEvaluacion({
      ...evaluacion,
      titulo: e.target.value,
    });
  };

  const agregarPregunta = () => {
    setEvaluacion({
      ...evaluacion,
      preguntas: [...evaluacion.preguntas, { pregunta: "", opciones: [] }],
    });
  };

  const handlePreguntaChange = (index, e) => {
    const nuevasPreguntas = [...evaluacion.preguntas];
    nuevasPreguntas[index].pregunta = e.target.value;
    setEvaluacion({
      ...evaluacion,
      preguntas: nuevasPreguntas,
    });
  };

  const agregarOpcion = (index) => {
    const nuevasPreguntas = [...evaluacion.preguntas];
    nuevasPreguntas[index].opciones = [...nuevasPreguntas[index].opciones, ""];
    setEvaluacion({
      ...evaluacion,
      preguntas: nuevasPreguntas,
    });
  };

  const handleOpcionChange = (preguntaIndex, opcionIndex, e) => {
    const nuevasPreguntas = [...evaluacion.preguntas];
    nuevasPreguntas[preguntaIndex].opciones[opcionIndex] = e.target.value;
    setEvaluacion({
      ...evaluacion,
      preguntas: nuevasPreguntas,
    });
  };

  const eliminarPregunta = (index) => {
    const nuevasPreguntas = [...evaluacion.preguntas];
    nuevasPreguntas.splice(index, 1);
    setEvaluacion({
      ...evaluacion,
      preguntas: nuevasPreguntas,
    });
  };

  const eliminarOpcion = (preguntaIndex, opcionIndex) => {
    const nuevasPreguntas = [...evaluacion.preguntas];
    nuevasPreguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
    setEvaluacion({
      ...evaluacion,
      preguntas: nuevasPreguntas,
    });
  };

  const agregarEvaluacion = async () => {
    try {
      const response = await axios.post(POST_API_URL, evaluacion);
      console.log("Evaluación agregada exitosamente:", response.data);
      setEvaluacion({
        titulo: "",
        preguntas: [],
      });
    } catch (error) {
      console.error("Error al agregar una nueva evaluación:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Formulario de Evaluación</h1>
      <div className="mb-3">
        <label className="form-label">Nombre de la Evaluación:</label>
        <input
          type="text"
          className="form-control"
          value={evaluacion.titulo}
          onChange={handleNombreChange}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={agregarPregunta}>
        Agregar Pregunta
      </button>

      {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
        <div key={preguntaIndex} className="card mb-3">
          <div className="card-body">
            <label className="form-label">
              Pregunta {preguntaIndex + 1}:
            </label>
            <input
              type="text"
              className="form-control"
              value={pregunta.pregunta}
              onChange={(e) => handlePreguntaChange(preguntaIndex, e)}
            />
            <button
              className="btn btn-secondary mb-3"
              onClick={() => agregarOpcion(preguntaIndex)}
            >
              Agregar Opción
            </button>

            <button
              className="btn btn-danger mb-3"
              onClick={() => eliminarPregunta(preguntaIndex)}
            >
              Eliminar Pregunta
            </button>

            {pregunta.opciones.map((opcion, opcionIndex) => (
              <div key={opcionIndex} className="mb-3">
                <label className="form-label">
                  Opción {opcionIndex + 1}:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={opcion}
                  onChange={(e) =>
                    handleOpcionChange(preguntaIndex, opcionIndex, e)
                  }
                />
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarOpcion(preguntaIndex, opcionIndex)}
                >
                  Eliminar Opción
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        className="btn btn-primary mb-3"
        onClick={() => agregarEvaluacion(evaluacion)}
      >
        Guardar Evaluación
      </button>
    </div>
  );
};
