const { Favorite } = require("../db");

const getFavById = async (req, res) => {
  try {
    const { userid } = req.params;

    // Verifica si el ID de usuario es un número entero
    if (!Number.isInteger(+userid)) {
      return res.status(400).json({ error: "Invalid userid" });
    }

    // Busca los favoritos en la base de datos que correspondan al ID de usuario
    const favs = await Favorite.findAll({ where: { userid } });

    return res.status(200).json(favs);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = getFavById;
