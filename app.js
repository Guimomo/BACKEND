import express from 'express';
import categoriasRoutes from './src/routes/categoriasRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({extended:true}))

// app.use('/categorias', categoriasRoutes);

// app.use('/productos', categoriasRoutes);

// Registrar las rutas
app.use('/', categoriasRoutes);

// app.get('/',(req,res)=>{
//     // console.log('hola desde el inicio');
//     res.send('hola desde el inicio');
    
// });


app.listen(3000,()=>{
    console.log("hola mundo");
    
})