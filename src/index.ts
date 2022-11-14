require('dotenv').config();
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.DB_NAME) {
    throw new Error('DB_NAME must be defined');
  }
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD must be defined');
  }
  if (!process.env.DB_USERNAME) {
    throw new Error('DB_USERNAME must be defined');
  }
  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST must be defined');
  }
  const port = process.env.PORT || 5000
  try {
    //@ts-ignore
    app.listen(port, () => {
      console.log(`Listening on ${port}!!`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();