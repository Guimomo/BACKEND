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

}

export default Categoria;