import  express from 'express';
import {config} from 'dotenv';
import { routers } from './src/routes';
import { runDatabase } from './src/utils/helper';
const app=express()
config();
app.use(express.json());
app.use(routers)


const PORT= parseInt(process.env.PORT as string)||5500;
// Before server running , it will first connct to database
runDatabase().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server is Running on Port http://localhost:${PORT} 🔥🔥🔥🔥`);
})
})
