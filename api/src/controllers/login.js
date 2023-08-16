const bcrypt = require("bcrypt");
const { User } = require("../db");

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) return res.status(400).send("Missing credentials");

    // Busca al usuario en la base de datos por su email
    const user = await User.findOne({ where: { email } });

    // Si el usuario no existe, devuelve una error
    if (!user) return res.status(404).send("User not found");

    // Compara la contraseña proporcionada con la contraseña almacenada usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    const userid = user.id;

    return isPasswordValid
      ? res.json({ access: true, userid })
      : res.status(403).send("Invalid Password");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
