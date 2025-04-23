import express from 'express';

import ProductoController from '../controllers/ProductoControllers.js';

const productoRouter = express();

try {

    //get es consultar, post es crear o subir, delete es eliminar, 
    //put es actualizar y patch es modificar parte de un recurso

    //POST -> crear producto
    productoRouter.post('/', ProductoController.createProducto);

    //PUT -> actualizar producto
    productoRouter.put('/:id', ProductoController.updateProducto);

    //PATCH -> modificar parte del producto
    productoRouter.patch('/:id', ProductoController.updateProducto);

    //DELETE -> eliminar producto
    productoRouter.delete('/:id', ProductoController.deleteProducto);
    
} catch (error) {

    console.log(error);
}

productoRouter.post('/',(req,res)=>{
    console.log(req.body);
    
});

export default productoRouter;