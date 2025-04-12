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

    async estaRelacionadaconProductos(categoria_id) {
    
        try {
            
            const [rows] = await connection.query("select * from productos where categoria_id = ?", [categoria_id]);
            
            return rows;

        } catch (error) {

            throw new Error("Error al obtener la categoria");
        }
        
    }

    //Metodo -> eliminar categoria
    async delete(id) {
        try {

            let datos = await this.getById(id)
            let tieneRelacion = await this.estaRelacionadaconProductos(datos.id);

            if (tieneRelacion.length > 0) {

                return {
                    error: true,
                    message: "No se puede eliminar la categoria porque tiene productos relacionados",
                }

            } else {

                const [result] = await connection.query("delete from categorias where id = ?", [id]);
                
                if (result.affectedRows === 0) {
                    return {
                        error: true,
                        message: "Categoria no encontrada"
                    }
                }

                return {
                    error: false,
                    message: "Categoria eliminada correctamente",
                    data: datos
                }
                
            }

            console.log(tieneRelacion);

        } catch (error) {
            console.log(error);
        }
    }

}

export default Categoria;