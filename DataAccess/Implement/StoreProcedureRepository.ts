import { IStoreProcedureRepository } from "../Interface/IStoreProcedureRepository";
import { Producto } from "../../Domain/Entities/Producto";
import { ProductoAdd } from "../../Domain/Entities/ProductoAdd";
import { Conection } from "../Conection";
import sql from "mssql";
import { injectable } from "inversify";

@injectable()
export class StoreProcedureRepository implements IStoreProcedureRepository {
  private conector: Conection;

  constructor() {
    this.conector = new Conection();
  }

  async GetAll(): Promise<any | null> {
    try {
      let pool: any = await this.conector.ConectDataBase();
  
      if (!pool) {
        
        throw new Error('Failed to establish connection to the database.');
    }

      const result = await pool.request().execute("SpSelectAllProducts");
      return result;
    } catch (error) {
      return error;
    }
   
  }
  async Insert(obj: ProductoAdd): Promise<void> {
    let pool: any = await this.conector.ConectDataBase();
    await pool
      .request()
      .input("@Name", sql.NVarChar(400), obj.Name)
      .input("@Description", sql.NVarChar(400), obj.Description)
      .input("@Price", sql.Decimal(18, 2), obj.Price)
      .input("@Stock", sql.Int, obj.Stock)
      .execute("SpInsertProducts");
  }

  async Update(obj: Producto): Promise<void> {
    let pool: any = await this.conector.ConectDataBase();
    await pool
      .request()
      .input("@Id", sql.Int, obj.Id)
      .input("@Name", sql.NVarChar(400), obj.Name)
      .input("@Description", sql.NVarChar(400), obj.Description)
      .input("@Price", sql.Decimal(18, 2), obj.Price)
      .input("@Stock", sql.Int, obj.Stock)
      .execute(" SpUpdateProducts ");
  }

  async Delete(id: number): Promise<void> {
    let pool: any = await this.conector.ConectDataBase();
    await pool
      .request()
      .input("@Id", sql.Int, id)
      .execute(" SpDeleteProducts ");
  }

  async GetByIdProduct(id: number): Promise<Producto | null> {
    let pool: any = await this.conector.ConectDataBase();

    const result = await pool
      .request()
      .input("@Id", sql.Int, id)
      .execute("SpSelectAllProducts");

    if (result.recordset.length > 0) {
      const { Id, Name, Description, Price, Stock } = result.recordset[0];
      let producto = new Producto();
      producto.Id = Id;
      producto.Description = Description;
      producto.Name = Name;
      producto.Price = Price; 
      producto.Stock = Stock; 
      return  producto;
    } else {
      return null;
    }
  }
}
