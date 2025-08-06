import express from 'express';
import { config } from 'dotenv';
import { routers } from './src/routes';
import { connectDatabase } from './src/config/database';
import { initializeModels } from './src/models/initializeModels';
import helmet from 'helmet';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express'
import { email } from 'zod';

const app = express()
app.use(helmet());
config();
app.use(express.json());
app.use(routers)

const PORT = parseInt(process.env.POSTGRES_PORT as string) || 5500;
const options={
  definition:{
    openapi:'3.0.0',
    info:{
      title:"API for Blogmanagement",
      version:'1.0.0',
      description:"Api documentation using swagger",
      contact:{
        name:"skills with Placide from solvit",
        email:"ikundabayoplacide500@gmail.com",
        url:"http://localhost:5500"
      }
    },
    servers:[
      {
        url:"http://localhost:5500",
      },
    ],
  },
  apis:["./routes/*.ts"],
}
const spacs=swaggerjsdoc(options)
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))

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