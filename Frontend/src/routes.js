import CrearPeliculas from "views/CrearPeliculas.js";
import ModificarUsuario from "views/ModificarUsuario.js";
import VerPeliculas from "views/VerPeliculas";

var routes = [
  {
    path: "/peliculas",
    name: "Ver Peliculas",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-spaceship",
    component: VerPeliculas,
    layout: "/admin"
  },

  {
    path: "/modificar-usuario",
    name: "Modificar Usuario",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: ModificarUsuario,
    layout: "/admin"
  },
  {
    path: "/crear-productos",
    name: "Crear Pelicula",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-video-66",
    component: CrearPeliculas,
    layout: "/admin"
  },
];
export default routes;
