import connection from "../Utils/db.js";

class Categoria {

    constructor(){ }

    //Metodo -> listar
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

    //Metodo -> obtener categoria por id
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

    //Metodo -> validar si la categoria tiene productos relacionados
    async estaRelacionadaconProductos(categoria_id) {
    
        try {
            
            const [rows] = await connection.query("select * from productos where categoria_id = ?", [categoria_id]);
            
            return rows;

        } catch (error) {

            throw new Error("Error al obtener la categoria");
        }
        
    }

    //Metodo -> actualizar categoria (put/patch)
    async update(id, nombre) {

        try {
            
            // el [] es para desestructurar el objeto
            const [result] = await connection.query("update categorias set nombre = ? where id = ?", [nombre, id]);

            if (result.affectedRows === 0) {

                return {

                    error: true,
                    message: "Categoria no encontrada"
                }
            }

            return {
                error: false,
                message: "Categoria actualizada correctamente"
            }

        } catch (error) {
            
            throw new Error("Error al actualizar la categoria");
        }
    }

    //Metodo -> eliminar categoria
    async delete(id) {
        try {

            let datos = await this.getById(id)

            //Consulto si datos (categoria) tiene productos relacionados
            let tieneRelacion = await this.estaRelacionadaconProductos(datos.id);

            //si tieneRelacion es mayor a 0 significa que tiene productos relacionados y retorno el mensaje
            if (tieneRelacion.length > 0) {

                return {
                    error: true,
                    message: "No se puede eliminar la categoria porque tiene productos relacionados",
                }

            }

            //si no tieneRelacion elimino la categoria
            else {

                const [result] = await connection.query("delete from categorias where id = ?", [id]);
                
                //valido que no tenga errores al eliminar la categoria
                if (result.affectedRows === 0) {
                    return {
                        error: true,
                        message: "Categoria no encontrada"
                    }
                }

                //retorno el mensaje de exito al eliminar la categoria
                return {
                    error: false,
                    message: "Categoria eliminada correctamente",
                    data: datos
                }
                
            }

        } catch (error) {
            console.log(error);
        }
    }

}

export default Categoria;