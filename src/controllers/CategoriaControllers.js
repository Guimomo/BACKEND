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

    //Metodo para crear categoria
    static async createCategoria(req,res) {

        //console.log(req.body);
        const {nombre, descripcion} = req.body;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.create(nombre, descripcion);

        return res.json(categoria);
    }

    //Metodo para eliminar categoria
    static deleteCategoria(req,res) {
        
        const {id} = req.params;
        const OBJCategoria = new Categoria();
        const Categoria = OBJCategoria.delete(id);

        return res.json(Categoria);
    }
}

export default CategoriaController;