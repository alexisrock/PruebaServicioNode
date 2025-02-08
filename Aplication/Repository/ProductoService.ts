import { IStoreProcedureRepository } from "../../Domain/Interfaces/IStoreProcedureRepository";
import { IProductoService } from "../Interface/IProductoService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Domain/Utils/Type";
import { Request } from "express";
import { ProductoAdd } from "../../Domain/Entities/ProductoAdd";
import { Producto } from "../../Domain/Entities/Producto";
import { BaseResponse } from "../../Domain/Common/BaseResponse";

@injectable()
export class ProductoService implements IProductoService {
  IStoreProcedureRepository: IStoreProcedureRepository;
  baseResponse = new BaseResponse();

  constructor(
    @inject(TYPES.IStoreProcedureRepository)
    IStoreProcedureRepository: IStoreProcedureRepository
  ) {
    this.IStoreProcedureRepository = IStoreProcedureRepository;
  }

  async GetAll(): Promise<Producto[] | null> {
    let produclist:Producto[] =[];
    try {
      let result = await this.IStoreProcedureRepository.GetAll();
  
      for(let index of result) {       
        let element = this.MapperproductResponse(index);
        produclist.push(element)
      }
      
      if (produclist !== null) {
        return Promise.resolve(produclist);
      }

      return Promise.resolve(null);
    } catch (error: any) {
      return error;
    }
  }

  async Insert(req: Request): Promise<BaseResponse> {
    try {
      
      let productoAdd = this.MapperProduct(req);
      await this.IStoreProcedureRepository.Insert(productoAdd);
      this.baseResponse.Mensaje = "Producto creado con exito";
    } catch (error: any) {
      this.baseResponse.Mensaje = error.message;
    }
    return Promise.resolve(this.baseResponse);
  }

  private MapperProduct(req: Request): ProductoAdd {
    let productoAdd = new ProductoAdd();
    productoAdd.Description = req.body.Description;
    productoAdd.Name = req.body.Name;
    productoAdd.Price = req.body.Price;
    productoAdd.Stock = req.body.Stock;
    return productoAdd;
  }

  async Update(req: Request): Promise<BaseResponse> {
    try {
      let producto =  this.MapperProductUpdate(req);
      await this.IStoreProcedureRepository.Update(producto);
      this.baseResponse.Mensaje = "Producto actualizado con exito";
    } catch (error: any) {
      this.baseResponse.Mensaje = error.message;
    }
    return Promise.resolve(this.baseResponse);
  }

  private MapperProductUpdate(req: Request): Producto {
    let producto = new Producto();
    producto.Id = req.body.Id;
    producto.Description = req.body.Description;
    producto.Name = req.body.Name;
    producto.Price = req.body.Price;
    producto.Stock = req.body.Stock;
    return producto;
  }

  async Delete(id: number): Promise<BaseResponse> {
    try {
      await this.IStoreProcedureRepository.Delete(id);
      this.baseResponse.Mensaje = "Producto eliminado con exito";
    } catch (error: any) {
      this.baseResponse.Mensaje = error.message;
    }
    return Promise.resolve(this.baseResponse);
  }

  async GetByIdProduct(id: number): Promise<Producto | null> {
  
    try {
      let result = await this.IStoreProcedureRepository.GetByIdProduct(id);
      if (result !== null) {
      let producto  = this.MapperproductResponse(result);
        return Promise.resolve(producto);
      }
      return null;
    } catch (error: any) {
       
      return error;
    }
  }

  MapperproductResponse(resul: any) {
    let producto = new Producto();
    const { Id, Name, Description, Price, Stock } = resul;
    producto.Id = Id;
    producto.Description = Description;
    producto.Name = Name;
    producto.Price = Price;
    producto.Stock = Stock;

    return producto;
  }
}
