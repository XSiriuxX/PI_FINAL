const { Favorite, User } = require("../db");
const { v4: uuidv4 } = require("uuid");

const postfav = async (req, res) => {
  try {
    const { id, name, platforms, image, releasedate, rating, userid } =
      req.body;

    if (!id || !name || !platforms || !image || !releasedate) {
      return res.status(400).send("Missing credentials");
    }

    // Verifica si el userid está presente en el cuerpo
    if (!userid) {
      return res.status(400).send("Missing Userid");
    }

    // Crea un nuevo registro favorito en la base de datos
    const newfavorite = await Favorite.create({
      userid,
      id: id.toString(),
      name,
      platforms,
      image,
      releasedate,
      rating,
    });

    // Busca el usuario por su ID
    const userfind = await User.findAll({ where: { id: userid } });

    // Asocia el nuevo favorito con el usuario encontrado
    await newfavorite.addUsers(userfind);

    const allfav = await Favorite.findAll();

    return res.status(201).json(allfav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postfav;
