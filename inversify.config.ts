import { Container } from 'inversify';
import { IStoreProcedureRepository } from './Domain/Interfaces/IStoreProcedureRepository';
import { StoreProcedureRepository } from './Infraestructure/Implement/StoreProcedureRepository';

import {  IProductoService } from './Aplication/Interface/IProductoService';
import {  ProductoService } from './Aplication/Repository/ProductoService';


import { ProductoController } from './Presentation/ProductoController';

import { TYPES } from './Domain/Utils/Type';
 
 


const container = new Container();
container.bind(ProductoController).toSelf().inSingletonScope();
container.bind<IStoreProcedureRepository>(TYPES.IStoreProcedureRepository).to(StoreProcedureRepository);
container.bind<IProductoService>(TYPES.IProductoService).to(ProductoService);

 
export { container };