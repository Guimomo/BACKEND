import connection from "../Utils/db.js";

class Producto{

    //Metodo -> crear un producto
    async createProducto(nombre, descripcion, precio, categoria_id) {
        try {
            // Ejecutar la consulta SQL para insertar el producto
            const [result] = await connection.query(
                "INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)",
                [nombre, descripcion, precio, categoria_id]
            );
    
            // Retornar el producto creado
            return {
                id: result.insertId,
                nombre,
                descripcion,
                precio,
                categoria_id,
            };
        } catch (error) {
            console.error("Error al crear el producto:", error.message);
            throw new Error("Error al crear el producto");
        }
    }

    //Metodo -> actualizar productos (put/patch)
    async updateProducto(id, campos) {
        try {
            // Verificar si el objeto `campos` está vacío
            if (!campos || Object.keys(campos).length === 0) {
                return {
                    error: true,
                    message: "No se encontraron campos para actualizar",
                };
            }
    
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

    // Metodo -> eliminar producto
    async deleteProducto(id) {
        try {
            // Verificar si el producto existe
            const [producto] = await connection.query("SELECT * FROM productos WHERE id = ?", [id]);
    
            if (producto.length === 0) {
                return {
                    error: true,
                    message: "Producto no encontrado",
                };
            }
    
            // Eliminar el producto
            const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);

            if (result.affectedRows === 0) {
                return {
                    error: true,
                   message: "No se pudo eliminar el producto",
                };
            }
    
            return {
                error: false,
                message: "Producto eliminado correctamente",
                data: producto[0],
            };
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            return {
                error: true,
                message: "Error al eliminar el producto",
            };
        }
    }
}

export default Producto;