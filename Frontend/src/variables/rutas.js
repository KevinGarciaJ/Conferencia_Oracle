let host ="localhost:9000"
export let URL = {
    crear_usuario: `http://${host}/usuarios/crear_usuario`,
    crear_pelicula: `http://${host}/peliculas/crear_pelicula`,
    obtener_peliculas: `http://${host}/peliculas/obtener_peliculas`,
    modificar_usuario: `http://${host}/usuarios/modificar_usuario`,
    login: `http://${host}/usuarios/login`,
};