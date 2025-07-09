import { NextFunction, Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "inversify-express-utils";
import { inject } from "inversify";
import { IProductoService } from "../Aplication/Interface/IProductoService";
import { TYPES } from "../Domain/Utils/Type";
import { NotFoundError } from "./Middleware/http-error.class";


/**
 * @swagger
 * tags:
 * name: producto
 * description: Gestión de producto
 */
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

  /**
   * @swagger
   * /api/producto/create:
   *   post:
   *     summary: Crea un nuevo producto
   *     tags: [producto]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ProductoAdd'
   *     responses:
   *       200:
   *         description: Producto creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Producto'
   *       404:
   *         description: Producto no creado
   *       500:
   *         description: Error interno del servidor
   */
  @httpPost("/create")
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const producto = await this.ProductoService.Insert(req);
      if (producto !== null) {
        return res.status(200).send(producto);
      }

      return res.status(404).send(producto);
    } catch (error: any) {

      next(new NotFoundError(error.message));
      return res.status(500).send("error: " + error.message);
      
    }
  }

  /**
   * @swagger
   * /api/producto/update:
   *   put:
   *     summary: Actualiza un producto existente
   *     tags: [producto]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Producto'
   *     responses:
   *       200:
   *         description: Producto actualizado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Producto'
   *       404:
   *         description: Producto no encontrado
   *       500:
   *         description: Error interno del servidor
   */
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

  /**
   * @swagger
   * /api/producto/delete:
   *   delete:
   *     summary: Elimina un producto por ID
   *     tags: [producto]
   *     parameters:
   *       - in: query
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID del producto a eliminar
   *     responses:
   *       200:
   *         description: Producto eliminado exitosamente
   *       404:
   *         description: Producto no encontrado
   *       500:
   *         description: Error interno del servidor
   */
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

  /**
   * @swagger
   * /api/producto/getAll:
   *   get:
   *     summary: Obtiene todos los productos
   *     tags: [producto]
   *     responses:
   *       200:
   *         description: Lista de productos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Producto'
   *       500:
   *         description: Error interno del servidor
   */
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
