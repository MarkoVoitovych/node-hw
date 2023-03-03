const mongoose = require('mongoose');

const app = require('./app');

mongoose.set('strictQuery', true);

const { DB_HOST, PORT = 3001 } = process.env;

(async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Database connection successful');
    app.listen(PORT);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
