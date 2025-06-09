// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('📩 Registro recibido:', { username, email });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(409).json({ message: 'Correo ya registrado' });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(409).json({ message: 'Nombre de usuario ya registrado' });


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    console.log('✅ Usuario guardado:', user);


    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
const user = await User.findOne({
  $or: [{ email: identifier }, { username: identifier }]
});



    if (!user) return res.status(404).json({ message: 'No existe' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // ✅ Aquí es donde el frontend espera recibir userId
    res.json({ message: 'Login correcto', userId: user._id });
    console.log("🔐 Login recibido:", req.body);


  } catch (err) {
    console.error('❌ Error al hacer login:', err.message);
    res.status(500).json({ message: 'Error en el login' });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // ✅ Verificar si el nuevo username o email ya están en uso por otro usuario
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername && existingUsername._id.toString() !== id) {
        return res.status(409).json({ message: 'Username ya está en uso' });
      }
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== id) {
        return res.status(409).json({ message: 'Email ya está en uso' });
      }
    }

    // ✅ Actualizar los datos
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    console.log("✅ Usuario actualizado:", user); 
    res.status(200).json({ message: 'Usuario actualizado correctamente' });

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};


module.exports = { register, login, actualizarUsuario };
