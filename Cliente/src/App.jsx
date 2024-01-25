import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Inicio } from "./pages/Inicio";
import { Formulario } from "./pages/Formulario";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Inicio />}></Route>
            <Route path="/formulario" element={<Formulario />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
