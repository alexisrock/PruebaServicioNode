
import { Producto } from '../../Domain/Entities/Producto';
import { BaseResponse } from '../../Domain/Common/BaseResponse';

import { Request } from 'express';


export interface IProductoService{
    GetAll(): Promise<any| null>;     
    Insert(req: Request ): Promise<BaseResponse>;
    Update(req: Request ): Promise<BaseResponse>;
    Delete(id: number): Promise<BaseResponse>;       
    GetByIdProduct(id: number): Promise<Producto| null>; 
}