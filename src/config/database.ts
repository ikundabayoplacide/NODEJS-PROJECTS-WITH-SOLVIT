import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DEV_DATABASE as string,
  process.env.DEV_USERNAME as string,
  process.env.DEV_PASSWORD as string,
  {
    host: process.env.DEV_HOST,
    port: parseInt(process.env.DEV_PORT as string, 10),
    dialect: "postgres",
     logging: (sql) => console.log(`[SQL]: ${sql}`) 
  
  }  
);
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL database connection established successfully.");
    const [results] = await sequelize.query("SELECT NOW() AS current_time")as any[];
    console.log("postgres time:",results[0].current_time);
    return true ;

  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
    return false; 
  }
}
export { sequelize, connectDatabase };