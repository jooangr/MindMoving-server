const User = require('../models/User');
const bcrypt = require('bcrypt');
const SesionEEG = require('../models/SesionEEG');
const PerfilCalibracion = require('../models/PerfilCalibracion');

// PATCH /update-user/:id
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

// POST /verificar-password/:id
const verificarPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    res.json({ success: valid });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error al verificar contraseña" });
  }
};

// GET /users/:id
const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    console.log(" Usuario enviado al frontend:", user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener datos del usuario' });
  }
};

// DELETE /users/:id
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  const { password } = req.query;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

    await user.deleteOne();
    await SesionEEG.deleteMany({ userId: id });
    await PerfilCalibracion.deleteMany({ usuarioId: id });

    return res.status(200).json({ success: true, message: 'Usuario y datos eliminados correctamente' });
  } catch (err) {
    console.error("❌ Error al eliminar:", err.message);
    res.status(500).json({ success: false, message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  actualizarUsuario,
  verificarPassword,
  obtenerUsuario,
  eliminarUsuario
};
