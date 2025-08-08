import express from 'express';
import { config } from 'dotenv';
import { routers } from './src/routes';
import { connectDatabase } from './src/config/database';
import { initializeModels } from './src/models/initializeModels';
import helmet from 'helmet';
import swaggerui from 'swagger-ui-express'
import swaggerOptions from './src/config/swagger';
import swaggerJSDoc from 'swagger-jsdoc';
const app = express()
app.use(helmet());
config();
app.use(express.json());

const specs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerui.serve,swaggerui.setup(specs));

const PORT = parseInt(process.env.POSTGRES_PORT as string) || 5500;
app.use(routers)


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