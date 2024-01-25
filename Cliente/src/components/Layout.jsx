import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="navegacion">
      <nav>
        <Link className="links" to="/">
          Inicio
        </Link>
        <Link className="links" to="/formulario">
          Formulario
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};
