const { Videogame, Genre } = require("../db");
const { v4: uuidv4 } = require("uuid");

const postvideogames = async (req, res) => {
  try {
    const { name, description, platforms, image, releasedate, rating, genres } =
      req.body;

    if (
      !name ||
      !description ||
      !platforms ||
      !image ||
      !releasedate ||
      !rating ||
      !genres
    ) {
      return res.status(400).send("Faltan datos");
    }

    // Verificar si generos está vacío o no se proporcionó
    if (!genres.length) return res.status(400).send("Agrega almenos un genero");

    // Buscar un registro existente que tenga el mismo name y description en la base de datos
    const existingVideogame = await Videogame.findOne({
      where: {
        name,
        description,
      },
    });

    // Si ya existe un registro con los mismos name y description, devolver un mensaje de error
    if (existingVideogame) {
      return res.status(400).json({ message: "The object already exists." });
    }

    // Generar un UUID único para el nuevo videojuego
    const id = uuidv4();

    // Buscar los géneros seleccionados por ID en la tabla Genre
    const selectedGenres = await Genre.findAll({
      where: { name: genres },
    });

    // Crear un nuevo videojuego en la tabla Videogame
    const videogame = await Videogame.create({
      id,
      name,
      description,
      platforms,
      image,
      releasedate,
      rating,
    });

    // Asociar los géneros encontrados al nuevo videojuego
    await videogame.addGenres(selectedGenres);

    return res.status(201).json(videogame);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postvideogames;
