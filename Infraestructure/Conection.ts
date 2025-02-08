import { createConnection } from "typeorm";

export class Conection {

  async conectToDB() {
    try {
      const connection = await createConnection();
      console.log("Conexión establecida con SQL Server");
      return connection;
    } catch (error) {
       console.log(error);
       return null;
    }
    
  }
}
