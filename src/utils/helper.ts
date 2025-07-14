import * as path from 'path';
import * as fs from 'fs';

const databasePath=path.join(__dirname,'../database.json');
const rawData=fs.readFileSync(databasePath,'utf-8');

export let Database=JSON.parse(rawData).Database;

export const saveDatabase=()=>{
    try{
    const dataToWrite=JSON.stringify({Database},null,2);
    fs.writeFileSync(databasePath,dataToWrite,'utf-8');
    console.log('database saved successfully');
    }
    catch(error){
        console.log('Error for saving database');
    }
}
export const loadDatabase = () => {
    try {
        const data = fs.readFileSync(databasePath, 'utf8');
        const parsed = JSON.parse(data);
        Database = parsed.Database || [];
        console.log('Database loaded successfully');
    } catch (error) {
        console.error('Error loading database:', error);
        Database = [];
    }
};
loadDatabase();