import express from 'express';

import CategoriaController from '../controllers/CategoriaControllers.js';

import validarDatos from '../middlewares/createCategoria.js';

const router = express();


try {

    router.get('/',CategoriaController.getAllCategorias);
    router.post('/', validarDatos, CategoriaController.createCategoria);
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