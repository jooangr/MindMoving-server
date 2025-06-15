const User = require('../models/User');

// Obtener el tema del usuario
const obtenerTemaUsuario = async (req, res) => {
    console.log('Obteniendo tema de usuario')
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.json({ theme: user.theme || 'light' });
  } catch (err) {
    res.status(500).send("Error del servidor");
  }
};

// Actualizar el tema del usuario
const actualizarTemaUsuario = async (req, res) => {
    console.log('Cambiando tema de usuario!')
  const { theme } = req.body;
  const userId = req.params.id;

  console.log("➡️ Tema recibido:", theme);
  console.log("🆔 ID recibido:", userId);

  if (!['light', 'dark'].includes(theme)) {
    return res.status(400).send("Tema inválido. Usa 'light' o 'dark'.");
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { theme },
      { new: true }
    );
    if (!user) {
      console.log("❌ Usuario no encontrado");
      return res.status(404).send("Usuario no encontrado");
    }

    console.log("✅ Usuario actualizado:", user);
    res.json({ message: "Tema actualizado", theme: user.theme });
  } catch (err) {
    console.error("💥 Error al actualizar el tema:", err);
    res.status(500).send("Error al actualizar el tema");
  }
};

module.exports = {
  obtenerTemaUsuario,
  actualizarTemaUsuario
};
