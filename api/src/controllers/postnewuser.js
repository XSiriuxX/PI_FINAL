const bcrypt = require("bcrypt");
const { User } = require("../db");

const postnewuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send("Missing credentials");

    //hasheado para la contraseña con bcrypt
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    // Intenta encontrar o crear un nuevo usuario en la base de datos
    const user = await User.findOrCreate({
      where: { email, password: hashedpassword },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postnewuser;
