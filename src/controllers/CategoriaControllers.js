import Categoria from "../models/Categoria.js";

class CategoriaController {
    
    //Obtener todas las categorias de la base de datos

    /**     
     * @param {object} req //peticion
     * @param {object} res //respuesta
     * @returns //respuesta en formato json 
     */

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

    //Metodo para actualizar categoria
    static async updateCategoria(req,res) {
        
        // el uso de {} es para desestructurar el objeto en este caso el req.params de id
        const { id } = req.params;
        const { nombre  } = req.body;
        const OBJCategoria = new Categoria();
        OBJCategoria.update(id, nombre);
        //const OBJCategoria = new Categoria();
        //const categoria = await OBJCategoria.update(id, nombre, descripcion);

        //return res.json(categoria);
    }

    //Metodo para eliminar categoria
    static async deleteCategoria(req,res) {
        
        const { id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.delete(id);

        return res.json(categoria);
    }

}

export default CategoriaController;