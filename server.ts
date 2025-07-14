import  express from 'express';
import {config} from 'dotenv';
import { Blogroute } from './routes';
const app=express()
config();
app.use(express.json());
app.use('/api',Blogroute);



const PORT= parseInt(process.env.PORT as string)||5500;
app.listen(PORT,()=>{
    console.log(`Server is Running on Port http://localhost:${PORT} 🔥🔥🔥🔥`);
})