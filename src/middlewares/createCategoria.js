const validarDatos = (req,res,next) => {

    const {nombre, descripcion} = req.body;

    if (!nombre || nombre.trim()==="") {
        console.log("Error: El nombre es obligatorio");
        return res
        .status(400)
        .json ({mensaje: "El nombre es obligatorio"})
    }

    if (!descripcion || descripcion.trim()==="") {
        console.log("Error: La descripción es obligatoria");
        return res
        .status(400)
        .json ({mensaje: "La descripcion es obligatoria"})
    }

    console.log("Paso la validación");
    next();
}

export default validarDatos;