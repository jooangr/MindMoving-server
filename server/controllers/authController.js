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
  console.log("🛠 Intento de login recibido:", req.body);

  try {
    const { identifier, password } = req.body;

    // LOG antes de buscar
    console.log("🔍 Buscando usuario con:", identifier);

    const user = await User.findOne({
      $or: [
        { email: new RegExp(`^${identifier}$`, 'i') },
        { username: new RegExp(`^${identifier}$`, 'i') }
      ]
    });

    // LOG después de buscar
    if (!user) {
      console.log("❌ Usuario no encontrado:", identifier);
      return res.status(404).json({ message: 'No existe' });
    }

    console.log("👤 Usuario encontrado:", user.username);

    const valid = await bcrypt.compare(password, user.password);

    // ⚠️ Si no es válido, intentamos con texto plano por si quedó sin hashear
    if (!valid) {
      if (user.password === password) {
        // Re-hashear la contraseña insegura
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
        await user.save();

        console.log('🔐 Contraseña antigua corregida y hasheada');
        return res.json({ message: 'Login correcto (actualizado)', userId: user._id });
      }

      console.log("🚫 Contraseña incorrecta para:", identifier);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    console.log("✅ Login correcto para:", identifier);
    return res.json({ message: 'Login correcto', userId: user._id });

  } catch (err) {
    console.error('💥 Error grave durante login:', err);
    return res.status(500).json({ message: 'Error en el login', error: err.message });
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
