const User = require('../models/User');
const bcrypt = require('bcrypt');

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password: hashedPassword },
      { new: true }
    );

    res.json({ message: 'Usuario actualizado', updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

module.exports = { actualizarUsuario };
