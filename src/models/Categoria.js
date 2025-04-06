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

        connection.query("insert into categorias (nombre,descripcion) values (?,?)", [nombre, descripcion])
        
    }

}

export default Categoria;