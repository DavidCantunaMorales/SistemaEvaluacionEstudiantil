import { Link, Outlet } from "react-router-dom";
import "./Layout.css"; // Importa el archivo de estilos específicos
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

export const Layout = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="item" to="/">
          Inicio
        </Link>
        <Link className="item" to="/formulario">
          Formulario
        </Link>
      </nav>
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};
