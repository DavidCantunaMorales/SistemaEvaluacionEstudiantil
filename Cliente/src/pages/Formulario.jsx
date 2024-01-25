import { useState } from "react";
import "./Formulario.css";


export const Formulario = () => {
  const [evaluacion, setEvaluacion] = useState({
    nombre: "",
    preguntas: [],
  });

  const handleNombreChange = (e) => {
    setEvaluacion({
      ...evaluacion,
      nombre: e.target.value,
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

  const guardarEvaluacionEnBackend = async () => {
    try {
      const response = await fetch("http://localhost:3001/guardar-evaluacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evaluacion),
      });

      if (response.ok) {
        console.log("Evaluación guardada con éxito en el servidor.");
      } else {
        console.error("Error al guardar la evaluación en el servidor.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Formulario de Evaluación</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nombreEvaluacion" className="form-label">
            Nombre de la Evaluación:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombreEvaluacion"
            value={evaluacion.nombre}
            onChange={handleNombreChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={agregarPregunta}
        >
          Agregar Pregunta
        </button>

        {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
          <div key={preguntaIndex} className="mb-3">
            <label htmlFor={`pregunta${preguntaIndex}`} className="form-label">
              Pregunta {preguntaIndex + 1}:
            </label>
            <input
              type="text"
              className="form-control"
              id={`pregunta${preguntaIndex}`}
              value={pregunta.pregunta}
              onChange={(e) => handlePreguntaChange(preguntaIndex, e)}
            />
            <button
              type="button"
              className="btn btn-secondary mb-3"
              onClick={() => agregarOpcion(preguntaIndex)}
            >
              Agregar Opción
            </button>

            {pregunta.opciones.map((opcion, opcionIndex) => (
              <div key={opcionIndex} className="mb-3">
                <label
                  htmlFor={`opcion${preguntaIndex}-${opcionIndex}`}
                  className="form-label"
                >
                  Opción {opcionIndex + 1}:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`opcion${preguntaIndex}-${opcionIndex}`}
                  value={opcion}
                  onChange={(e) =>
                    handleOpcionChange(preguntaIndex, opcionIndex, e)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        <div className="mb-3">
          <h2>Resumen:</h2>
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
        </div>
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={() => guardarEvaluacionEnBackend(evaluacion)}
        >
          Guardar Evaluación
        </button>
      </form>
    </div>
  );
};
