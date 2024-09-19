import { IStoreProcedureRepository } from "../Interface/IStoreProcedureRepository";
import { Producto } from "../../Domain/Entities/Producto";
import { ProductoAdd } from "../../Domain/Entities/ProductoAdd";
import { Conection } from "../Conection";
import { injectable } from "inversify";

@injectable()
export class StoreProcedureRepository implements IStoreProcedureRepository {
  private conector: Conection;

  constructor() {
    this.conector = new Conection();
  }

  async GetAll(): Promise<any | null> {
    try {
      let pool: any = await this.conector.conectToDB();

      if (!pool) {
        throw new Error("Failed to establish connection to the database.");
      }

      const result = await pool.query("SpSelectAllProducts");
      return result;
    } catch (error) {
      return error;
    }
  }
  async Insert(obj: ProductoAdd): Promise<void> {
    let pool: any = await this.conector.conectToDB();
    await pool       
      .query(
        "EXEC SpInsertProducts @Name = ?, @Description = ?,  @Price = ?, @Stock",
        [obj.Name, obj.Description, obj.Price, obj.Stock]
      );
  }

  async Update(obj: Producto): Promise<void> {
    let pool: any = await this.conector.conectToDB();
    await pool      
      .query(
        "EXEC SpUpdateProducts @Id, @Name = ?, @Description = ?,  @Price = ?, @Stock",
        [obj.Id, obj.Name, obj.Description, obj.Price, obj.Stock]
      );
  }

  async Delete(id: number): Promise<void> {
    let pool: any = await this.conector.conectToDB();
    await pool.getConnection().query("EXEC SpDeleteProducts  @Id ", [id]);
  }

  async GetByIdProduct(id: number): Promise<Producto | null> {
    let pool: any = await this.conector.conectToDB();

    const result = await pool    
      .query("EXEC SpSelectIdProducts  @Id ", [id]);

    if (result.recordset.length > 0) {
      const { Id, Name, Description, Price, Stock } = result.recordset[0];
      let producto = new Producto();
      producto.Id = Id;
      producto.Description = Description;
      producto.Name = Name;
      producto.Price = Price;
      producto.Stock = Stock;
      return producto;
    } else {
      return null;
    }
  }
}
