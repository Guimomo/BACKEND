import express from 'express';

import CategoriaController from '../controllers/CategoriaControllers.js';

const router = express();

router.get('/',CategoriaController.getAllCategorias);
router.get('/',CategoriaController.createCategoria);

router.post('/',(req,res)=>{
    console.log(req.body);
    
});

// router.get('/',(req,res)=>{

     //res.send('hola desde el inicio');
// });

export default router;