const bcrypt = require("bcrypt");
const { User } = require("../db");

const postnewuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send("Faltan datos");

    //hasheado para la contraseña
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findOrCreate({
      where: { email, password: hashedpassword },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postnewuser;
