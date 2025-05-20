// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('📩 Registro recibido:', { username, email });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Correo ya registrado' });

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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No existe' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    res.json({ message: 'Login correcto', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login' });
  }
};

module.exports = { register, login };
