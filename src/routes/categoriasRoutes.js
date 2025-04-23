import express from 'express';

import CategoriaController from '../controllers/CategoriaControllers.js';

import validarDatos from '../middlewares/createCategoria.js';

const router = express();


try {

    //get es consultar, post es crear o subir, delete es eliminar, 
    //put es actualizar y patch es modificar parte de un recurso

    //GET -> listar todas las categorias
    router.get('/categorias',CategoriaController.getAllCategorias);

    //POST -> crear categoria
    router.post('/categorias', validarDatos, CategoriaController.createCategoria);
    //ruta para crear un producto
    router.post('/productos', CategoriaController.createProducto);

    //PUT -> actualizar categoria
    router.put('/categorias/:id', CategoriaController.updateCategoria);
    // Ruta para actualizar un producto
    router.put('/productos/:id', CategoriaController.updateProducto);

    //PATCH -> modificar parte de la categoria
    router.patch('/categorias/:id', CategoriaController.updateCategoria);
    // Ruta para actualizar un producto
    router.patch('/productos/:id', CategoriaController.updateProducto);

    //DELETE -> eliminar categoria
    router.delete('/categorias/:id', CategoriaController.deleteCategoria);

    // Ruta para eliminar un producto
    router.delete('/productos/:id', CategoriaController.deleteProducto);
    
} catch (error) {

    console.log(error);
}

// router.delete('/:id',(req,res)=>{
//     const {id} = req.params;
//     console.log("eliminar categoria con id: ", id);

// });

router.post('/',(req,res)=>{
    console.log(req.body);
    
});

// router.get('/',(req,res)=>{

     //res.send('hola desde el inicio');
// });

export default router;