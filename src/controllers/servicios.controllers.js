export const prueba = (req, res) => {
    res.json("hasta luego ultima prueba");

}
export const crearServicio = (req, res) => {
    try{
       console.log(req.body)
       res.json("hasta Luego")
    }catch(error){
        console.error(error)
        res.status(500).json({mensaje:'ocurrio un error'})
    }

}