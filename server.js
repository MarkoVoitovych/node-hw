const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);

(async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('mongoose connect');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log('Failed');
    process.exit(1);
  }
})();
