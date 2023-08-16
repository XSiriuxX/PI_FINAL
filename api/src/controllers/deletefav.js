const { Favorite } = require("../db");

const deleteFav = async (req, res) => {
  try {
    const { id } = req.params;

    // Elimina el registro favorito correspondiente al ID
    await Favorite.destroy({ where: { id } });

    // Recupera todos los favoritos después de la eliminación
    const allfav = await Favorite.findAll();

    return res.status(200).json(allfav);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

module.exports = deleteFav;
