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
    async update(id, campos) {

            //console.log(campos, id);
            let query = "UPDATE categorias SET ";
            let params = [];
            //construimos dinamicamente la consulta con los campos que llegan
            // console.log(Object.entries(campos));

            const camposEntries = Object.entries(campos);
            for (const [key, value] of camposEntries) {
                
                
                // Validar si el valor es inválido
                if (value === null || value === undefined || value === "") {
                    return {
                        error: true,
                        message: `El valor para el campo '${key}' no es válido.`, 
                            
                    };
                }
                
                query += `${key} = ?, `;
                params.push(value);


            }


            // console.log(query);
            query = query.slice(0, -2); //eliminamos la ultima coma y el espacio
            query += " where id = ?";
            params.push(id); //agregamos el id al final de los params

            try {

                const [result] = await connection.query(query, params);
                
                //return result.affectedRows > 0 ? {id, ...campos} : null;

                if (result.affectedRows === 0) {
                    return {
                        error: true,
                        message: "No se pudo actualizar la categoria",
                    }
                }

                return {
                    error: false,
                    message: "Categoria actualizada correctamente"
                }
                
            } catch (error) {
                
            }
            console.log(query,params);
    }


    //Metodo -> actualizar productos (put/patch)
    async updateProducto(id, campos) {
        
        try {
        
            let query = "UPDATE productos SET ";
            let params = [];
        
            // Construir dinámicamente la consulta SQL
            const camposEntries = Object.entries(campos);

            for (const [key, value] of camposEntries) {
                // Validar si el valor es inválido
                if (value === null || value === undefined || value === "") {
                    return {
                        error: true,
                        message: `El valor para el campo '${key}' no es válido.`,
                    };
                }
        
                query += `${key} = ?, `;
                params.push(value);
            }
        
            query = query.slice(0, -2); // Eliminar la última coma y espacio
            query += " WHERE id = ?";
            params.push(id); // Agregar el ID al final de los parámetros
        
            console.log("Consulta SQL:", query);
            console.log("Parámetros:", params);
        
            // Ejecutar la consulta
            const [result] = await connection.query(query, params);
        
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    message: "No se pudo actualizar el producto",
                };
            }
        
            return {
                error: false,
                message: "Producto actualizado correctamente",
            };

        } catch (error) {

            console.error("Error al actualizar el producto:", error.message);
            return {
                error: true,
                message: "Error al actualizar el producto",
            };
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