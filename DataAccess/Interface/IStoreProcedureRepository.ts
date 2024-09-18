
import { Producto } from '../../Domain/Entities/Producto';
import { ProductoAdd } from '../../Domain/Entities/ProductoAdd';



export interface IStoreProcedureRepository{
    GetAll(): Promise<any| null>;     
    Insert(obj: ProductoAdd ): Promise<void>;
    Update(obj: Producto ): Promise<void>;
    Delete(id: number): Promise<void>;       
    GetByIdProduct(id: number): Promise<Producto| null>; 
}