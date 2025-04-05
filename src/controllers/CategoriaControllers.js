import Categoria from "../models/Categoria.js";

class CategoriaController {
    
    //Obtener todas las categorias de la base de datos

    static getAllCategorias (req,res) {
        //console.log("listar todas las categorias");
        //res.send("hola desde controlador")
        const OBJCategoria = new Categoria();
        OBJCategoria.getAll();
    }
}

export default CategoriaController;