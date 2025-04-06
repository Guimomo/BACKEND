import Categoria from "../models/Categoria.js";

class CategoriaController {
    
    //Obtener todas las categorias de la base de datos

    static async getAllCategorias (req,res) {
        //console.log("listar todas las categorias");
        //res.send("hola desde controlador")

        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        return res.json(categorias)

        // console.log("desde el controlador");
        
    }
}

export default CategoriaController;