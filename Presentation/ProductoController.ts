import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject } from "inversify";
import { IProductoService } from "../Core/Interface/IProductoService";
import { TYPES } from "../Domain/Utils/Type";

@controller("/producto")
export class ProductoController {
  private readonly ProductoService: IProductoService;

  /**
   *
   */
  constructor(
    @inject(TYPES.IProductoService) ProductoService: IProductoService
  ) {
    this.ProductoService = ProductoService;
  }

  @httpPost("/create")
  async create(req: Request, res: Response) {
    try {
      const producto = await this.ProductoService.Insert(req);
      if (producto !== null) {
        return res.status(200).send(producto);
      }

      return res.status(404).send(producto);
    } catch (error: any) {
      return res.status(500).send("error: " + error.message);
    }
  }

  @httpPut("/update")
  async Update(req: Request, res: Response) {
    try {
      const producto = await this.ProductoService.Update(req);
      if (producto !== null) {
        return res.status(200).send(producto);
      }

      return res.status(404).send(producto);
    } catch (error: any) {
      return res.status(500).send("error: " + error.message);
    }
  }

  @httpDelete("/delete")
  async Delete(req: Request, res: Response) {
    try {
      let id: number = parseInt(req.params.id);

      const producto = await this.ProductoService.Delete(id);
      if (producto !== null) {
        return res.status(200).send(producto);
      }

      return res.status(404).send(producto);
    } catch (error: any) {
      return res.status(500).send("error: " + error.message);
    }
  }

  @httpGet("/getAll")
  async GeAll(res: Response) {
    try {        
      const producto = await this.ProductoService.GetAll();  
      return producto; 
    } catch (error: any) {
      return res.status(500).send("error: " + error.message);
    }
  }
}
