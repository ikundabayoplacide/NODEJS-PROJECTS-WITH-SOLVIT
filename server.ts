import express from 'express';
import { config } from 'dotenv';
import { routers } from './src/routes';
import { connectDatabase } from './src/config/database';
import { Blog } from './src/models/blogModel';
import { User } from './src/models/userModel';
import { initializeModels } from './src/models/initializeModels';

const app = express()
config();
app.use(express.json());
app.use(routers)

const PORT = parseInt(process.env.PORT as string) || 5500;
// Before server running , it will first connct to database
async function startServer() {
  try {
    const isConnected = await connectDatabase();
    if (!isConnected) {
      console.error('server can not start because database is not connected');
      return;
    }
  initializeModels();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}
startServer();