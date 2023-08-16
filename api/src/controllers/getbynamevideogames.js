const axios = require("axios");
const url = "https://api.rawg.io/api/games";
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame } = require("../db");
const { Op } = require("sequelize");

const getbynamevideogames = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      throw new Error('Please provide the "name" parameter in the query.');
    }

    //Buscar el nombre en al DB
    const videogame = await Videogame.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    // Realizar la solicitud a la API
    const response = await axios.get(`${url}?key=${API_KEY}&search=${name}`);

    // Filtrar los videojuegos encontrados que coinciden solo 15 con el nombre proporcionado
    const filtrados = response.data.results
      .filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 15);

    // Mapear los datos de los videojuegos filtrados para obtener una lista
    const videoGames = filtrados.map((data) => ({
      id: data.id,
      name: data.name,
      releasedate: data.released,
      rating: data.rating,
      description: data.description,
      platforms: data.platforms.map((plat) => plat.platform.name),
      image: data.background_image,
    }));

    // Agregar el videogame a videoGames solo si se encontró un videojuego con el nombre proporcionado
    if (videogame) {
      videoGames.push({
        id: videogame.id,
        name: videogame.name,
        releasedate: videogame.releasedate,
        rating: videogame.rating,
        description: videogame.description,
        platforms: videogame.platforms,
        image: videogame.image,
      });
    }

    // Si no se encontraron videojuegos que coincidan con el nombre, devolver un mensaje de error 404
    if (videoGames.length === 0) {
      return res.status(404).json({
        message: `No video games found with the name ${name}`,
      });
    }

    res.status(200).json(videoGames);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = getbynamevideogames;
