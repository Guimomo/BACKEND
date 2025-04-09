import connection from "../Utils/db.js";

class Categoria {

    constructor(){ }

    //Metodos -> listar
    async getAll(){

        try {
            
            const [rows] = await connection.query("SELECT * FROM categorias");
            return rows;

        } catch (error) {
            
            throw new Error("Error al obtener las categorias");
        }
    }

    //Metodo -> crear categoria
    create(nombre, descripcion) {

        const [result] = connection.query("insert into categorias (nombre,descripcion) values (?,?)", [nombre, descripcion]);
        
        return {
            id: result.insertId,
            nombre,
            descripcion
        }        
        
    }

    async getById(id) {

        try {
            
            const [rows] = await connection.query("select * from categorias where id = ?", [id]);

            if (rows.length === 0) {

                throw new Error("Categoria no encontrada");
            }

            return rows[0];

        } catch (error) {

            throw new Error("Error al obtener la categoria");
        }
    }

    estaRelacionadaconProductos(categoria_id) {
    
        
    }
    //Metodo -> eliminar categoria
    async delete(id) {
        try {
            //const [result] = connection.query("delete from categorias where id = ?", [id]);
            //return result;

            let datos = await this.getById(id);
            console.log("Datos de la categoría seleccionada:", datos);

            return {
                mensaje: "Categoría encontrada. Confirma si deseas eliminarla.",
                categoria: datos,
            };

        } catch (error) {
            throw new Error("Error al eliminar la categoria");
        }
    }

}

export default Categoria;