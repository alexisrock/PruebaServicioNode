// src/config/swagger.config.ts

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI (Swagger)
    info: {
      title: 'API de Productos', // Título de tu API
      version: '1.0.0', // Versión de tu API
    },
    components: {
      schemas: {
        Producto: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Producto A' },
            precio: { type: 'number', example: 100.0 },
            // agrega aquí los campos reales de tu modelo
          },
        },
        ProductoAdd: {
          type: 'object',
          properties: {
            nombre: { type: 'string', example: 'Producto A' },
            precio: { type: 'number', example: 100.0 },
            // agrega aquí los campos requeridos para crear un producto
          },
        },
      },
    },
  },
  // Rutas donde swagger-jsdoc buscará comentarios JSDoc para generar la documentación
  // Asegúrate de que esta ruta sea correcta para tu ProductoController
  apis: [
    './Presentation/*.ts', // <-- asegúrate que esta ruta apunta a tus controladores
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;