
class CategoriaController {
    
    //Obtener todas las categorias de la base de datos

    static getAllCategorias (req,res) {
        console.log("listar todas las categorias");
        res.send("hola desde controlador")
        
    }
}

export default CategoriaController;