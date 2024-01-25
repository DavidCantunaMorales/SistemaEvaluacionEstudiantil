import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="container-fluid">
      <nav className="nav-bar">
        <Link className="item" to="/">
          Inicio
        </Link>
        <Link className="item" to="/formulario">
          Formulario
        </Link>
      </nav>
      <div className="container formulario-container">
        <Outlet />
      </div>
    </div>
  );
};
