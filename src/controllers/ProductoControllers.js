import Producto from '../models/Producto';

class ProductoController {

    static async getAllProductos(req, res) {

        const OBJProducto = new Producto(); // Crear una instancia del modelo Producto
        const productos = await OBJProducto.getAll(); // Llamar al método getAll del modelo Producto
        return res.json(productos); // Devolver la lista de productos como respuesta en formato JSON
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
    
            const OBJProducto = new Producto(); // Crear una instancia del modelo
            const producto = await OBJProducto.createProducto(nombre, descripcion, precio, categoria_id); // Llamar al método del modelo
    
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

    //Metodo para actualizar producto
    static async updateProducto(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
            const campos = req.body; // Obtener los campos a actualizar desde el cuerpo de la solicitud
    
            console.log("ID recibido:", id);
            console.log("Campos recibidos:", campos);
    
            const OBJProducto = new Producto(); // Crear una instancia del modelo
            const resultado = await OBJProducto.updateProducto(id, campos); // Llamar al método del modelo
    
            return res.json(resultado); // Retornar la respuesta
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        }
    }

    //Metodo para eliminar producto
    static async deleteProducto(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
            const OBJProducto = new Producto(); // Crear una instancia del modelo Categoria
    
            // Llamar al método deleteProducto del modelo
            const resultado = await OBJProducto.deleteProducto(id);
    
            // Retornar la respuesta
            return res.json(resultado);
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            return res.status(500).json({ mensaje: "Error interno del servidor" });
        }
    }

}

export default ProductoController; // Exportar la clase ProductoController para que pueda ser utilizada en otras partes de la aplicación