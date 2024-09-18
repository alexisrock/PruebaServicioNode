import { Container } from 'inversify';
import { IStoreProcedureRepository } from './DataAccess/Interface/IStoreProcedureRepository';
import { StoreProcedureRepository } from './DataAccess/Implement/StoreProcedureRepository';

import {  IProductoService } from './Core/Interface/IProductoService';
import {  ProductoService } from './Core/Repository/ProductoService';


import { ProductoController } from './Presentacion/ProductoController';

import { TYPES } from './Domain/Utils/Type';
 
 


const container = new Container();
 

container.bind(ProductoController).toSelf().inSingletonScope();
 
container.bind<IStoreProcedureRepository>(TYPES.IStoreProcedureRepository).to(StoreProcedureRepository);
container.bind<IProductoService>(TYPES.IProductoService).to(ProductoService);

 
export { container };