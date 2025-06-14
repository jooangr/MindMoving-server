const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');


const MONGO_URI = 'mongodb+srv://joangallardorobles:8Qqdqhc9ms4aidPS@cluster0.we76x7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const user = await User.findOne({ username: 'joan2' });
    if (!user) {
      console.log('❌ Usuario admin no encontrado');
      return process.exit(1);
    }

    const newPassword = '1234';
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    await user.save();

    console.log('✅ Contraseña de admin actualizada a: 1234');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al actualizar contraseña:', err.message);
    process.exit(1);
  }
};

run();
