import { IStoreProcedureRepository } from "../Interface/IStoreProcedureRepository";
import { Producto } from "../../Domain/Entities/Producto";
import { ProductoAdd } from "../../Domain/Entities/ProductoAdd";
import { Conection } from "../Conection";
import { injectable } from "inversify";

@injectable()
export class StoreProcedureRepository implements IStoreProcedureRepository {
  private readonly conector: Conection = new Conection();

  constructor() {}

  async GetAll(): Promise<any> {
    let pool: any = await this.conector.conectToDB();
    let result;
    try {
      if (!pool) {
        throw new Error("Failed to establish connection to the database.");
      }

      result = await pool.query("SpSelectAllProducts");
    } catch (error) {
      return error;
    } finally {
      pool.close();
    }
    return result;
  }

  async Insert(obj: ProductoAdd): Promise<void> {
    let pool: any = await this.conector.conectToDB();
    try {
      await pool.query(
        "EXEC SpInsertProducts @Name = ?, @Description = ?,  @Price = ?, @Stock",
        [obj.Name, obj.Description, obj.Price, obj.Stock]
      );
    } catch (error) {
    } finally {
      pool.close();
    }
  }

  async Update(obj: Producto): Promise<void> {
    let pool: any = await this.conector.conectToDB();

    try {
      await pool.query(
        "EXEC SpUpdateProducts @Id, @Name = ?, @Description = ?,  @Price = ?, @Stock",
        [obj.Id, obj.Name, obj.Description, obj.Price, obj.Stock]
      );
    } catch (error) {
    } finally {
      pool.close();
    }
  }

  async Delete(id: number): Promise<void> {
    let pool: any = await this.conector.conectToDB();
    try {
      await pool.query("EXEC SpDeleteProducts  @Id ", [id]);
    } catch (error) {
    } finally {
      pool.close();
    }
  }

  async GetByIdProduct(id: number): Promise<any> {
    let pool: any = await this.conector.conectToDB();
    let product;
    try {
      const result = await pool.query("EXEC SpSelectIdProducts  @Id ", [id]);
      product = result.recordset[0];
    } catch (error) {}
    finally {
      pool.close();
    }    
    return product;
  }

}
