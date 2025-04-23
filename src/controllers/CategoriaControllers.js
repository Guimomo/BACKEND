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
        const campos = req.body;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.update(id, campos);
        //const OBJCategoria = new Categoria();
        //const categoria = await OBJCategoria.update(id, nombre, descripcion);

        return res.json(categoria);
    }

    //Metodo para actualizar producto
    static async updateProducto(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
            const campos = req.body; // Obtener los campos a actualizar desde el cuerpo de la solicitud
    
            console.log("ID recibido:", id);
            console.log("Campos recibidos:", campos);
    
            const OBJCategoria = new Categoria(); // Crear una instancia del modelo
            const resultado = await OBJCategoria.updateProducto(id, campos); // Llamar al método del modelo
    
            return res.json(resultado); // Retornar la respuesta
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        }
    }

    //Metodo para eliminar categoria
    static async deleteCategoria(req,res) {
        
        const { id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.delete(id);

        return res.json(categoria);
    }

    //Metodo para eliminar producto
    static async deleteProducto(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
            const OBJCategoria = new Categoria(); // Crear una instancia del modelo Categoria
    
            // Llamar al método deleteProducto del modelo
            const resultado = await OBJCategoria.deleteProducto(id);
    
            // Retornar la respuesta
            return res.json(resultado);
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        }
    }

    //Metodo para crear producto
    static async createProducto(req, res) {
        try {
            const { nombre, descripcion, precio, categoria_id } = req.body; // Obtener los datos del producto desde el cuerpo de la solicitud
    
            // Validar que todos los campos estén presentes
            if (!nombre || !descripcion || !precio || !categoria_id) {
                return res.status(400).json({
                    error: true,
                    message: "Todos los campos son obligatorios (nombre, descripcion, precio, categoria_id)",
                });
            }
    
            const OBJCategoria = new Categoria(); // Crear una instancia del modelo
            const producto = await OBJCategoria.createProducto(nombre, descripcion, precio, categoria_id); // Llamar al método del modelo
    
            return res.status(201).json({
                error: false,
                message: "Producto creado correctamente",
                data: producto,
            });
        } catch (error) {
            console.error("Error al crear el producto:", error.message);
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        }
    }

}

export default CategoriaController;