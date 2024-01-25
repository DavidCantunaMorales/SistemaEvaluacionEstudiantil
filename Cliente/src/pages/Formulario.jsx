import { useState } from "react";
import axios from "axios";

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
      // Hacer algo con la respuesta, por ejemplo, actualizar el estado o redirigir
      console.log("Evaluación agregada exitosamente:", response.data);

      // Puedes actualizar el estado aquí si es necesario
      setEvaluacion({
        titulo: "",
        preguntas: [],
      });
    } catch (error) {
      console.error("Error al agregar una nueva evaluación:", error);
    }
  };

  return (
    <div>
      <h1>Formulario de Evaluación</h1>
      <label>
        Nombre de la Evaluación:
        <input
          type="text"
          value={evaluacion.titulo}
          onChange={handleNombreChange}
        />
      </label>
      <button onClick={agregarPregunta}>Agregar Pregunta</button>

      {evaluacion.preguntas.map((pregunta, preguntaIndex) => (
        <div key={preguntaIndex}>
          <label>
            Pregunta {preguntaIndex + 1}:
            <input
              type="text"
              value={pregunta.pregunta}
              onChange={(e) => handlePreguntaChange(preguntaIndex, e)}
            />
          </label>
          <button onClick={() => agregarOpcion(preguntaIndex)}>
            Agregar Opción
          </button>

          <button onClick={() => eliminarPregunta(preguntaIndex)}>
            Eliminar Pregunta
          </button>

          {pregunta.opciones.map((opcion, opcionIndex) => (
            <div key={opcionIndex}>
              <label>
                Opción {opcionIndex + 1}:
                <input
                  type="text"
                  value={opcion}
                  onChange={(e) =>
                    handleOpcionChange(preguntaIndex, opcionIndex, e)
                  }
                />
              </label>
              <button
                onClick={() => eliminarOpcion(preguntaIndex, opcionIndex)}
              >
                Eliminar Opción
              </button>
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => agregarEvaluacion(evaluacion)}>
        Guardar Evaluación
      </button>
    </div>
  );
};
