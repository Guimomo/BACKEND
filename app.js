import express from 'express';
import bodyParser from 'body-parser';
import categoriasRoutes from './src/routes/categoriasRoutes.js'; 
import productoRouter from './src/routes/productoRoutes.js';

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({extended:true}))

// Registrar las rutas
app.use('/categorias', categoriasRoutes);
app.use('/productos', productoRouter);

// Registrar las rutas en un solo sitio
//app.use('/', categoriasRoutes);

// app.get('/',(req,res)=>{
//     // console.log('hola desde el inicio');
//     res.send('hola desde el inicio');
    
// });


app.listen(3000,()=>{
    console.log("hola mundo");
    
});