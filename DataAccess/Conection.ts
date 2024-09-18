import {  config }  from 'mssql';
import sql  from 'mssql/msnodesqlv8';

export class Conection {
    async ConectDataBase() {
        try {
            const config : config= {
                user: 'usrManejorh',
                password: 'usrManejorh',
                server: 'DESKTOP-58J73J1\\SQLEXPRESS',                
                database: 'PruebaServicio',
                options: {
                    encrypt: false, 
                    trustServerCertificate: true
                },
                pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
                connectionTimeout: 30000 ,
                driver: "msnodesqlv8",
            };

            let pool = await sql.connect(config);           
            return pool;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            return null;
        }   
    }
}