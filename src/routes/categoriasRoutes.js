import express from 'express';

import CategoriaController from '../controllers/CategoriaControllers.js';

const router = express();

router.get('/',CategoriaController.getAllCategorias);

// router.get('/',(req,res)=>{

     //res.send('hola desde el inicio');
// });

export default router;