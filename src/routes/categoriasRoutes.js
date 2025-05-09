import express from 'express';

import CategoriaController from '../controllers/CategoriaControllers.js';

import validarDatos from '../middlewares/createCategoria.js';

const router = express();


try {

    //get es consultar, post es crear o subir, delete es eliminar, 
    //put es actualizar y patch es modificar parte de un recurso

    //GET -> listar todas las categorias
    router.get('/',CategoriaController.getAllCategorias);

    //POST -> crear categoria
    router.post('/', validarDatos, CategoriaController.createCategoria);

    //PUT -> actualizar categoria
    router.put('/:id', CategoriaController.updateCategoria);

    //PATCH -> modificar parte de la categoria
    router.patch('/:id', CategoriaController.updateCategoria);

    //DELETE -> eliminar categoria
    router.delete('/:id', CategoriaController.deleteCategoria);
    
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