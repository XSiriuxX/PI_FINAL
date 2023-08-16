const { Router } = require("express");

// Importar todos los routers;

const getallgenres = require("../controllers/getallgenres");
const getallvideogames = require("../controllers/getallvideogames");
const getbyidvideogames = require("../controllers/getbyidvideogames");
const getbynamevideogames = require("../controllers/getbynamevideogames");
const postvideogames = require("../controllers/postvideogames");
const postnewuser = require("../controllers/postnewuser");
const login = require("../controllers/login");
const postfav = require("../controllers/postfav");
const deletefav = require("../controllers/deletefav");
const getFavById = require("../controllers/getfavbyid");

const router = Router();

// Configurar los routers

// Ruta para obtener todos los géneros de la API
router.get("/genres", getallgenres);

//Ruta para obtener todos los favoritos segun el userid
router.get("/fav/:userid", getFavById);

// Ruta para obtener los primeros 15 videojuegos que contienen el nombre especificado
router.get("/name", getbynamevideogames);

// Ruta para manejar el inicio de sesión de usuario
router.get("/login", login);

// Ruta para obtener todos los videojuegos de la API
router.get("/", getallvideogames);

// Ruta para obtener el detalle de un videojuego específico por su ID
router.get("/:id", getbyidvideogames);

// Ruta para registrar un nuevo usuario
router.post("/register", postnewuser);

// Ruta para crear un nuevo videojuego y relacionarlo con sus géneros solicitados
router.post("/", postvideogames);

// Ruta para agregar un nuevo videojuego a favoritos
router.post("/fav", postfav);

// Ruta para eliminar un videojuego favorito por su ID
router.delete("/fav/:id", deletefav);

module.exports = router;
