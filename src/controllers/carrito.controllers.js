export const agregarAlCarrito = async(req, res)=>{
    try {
        res.send('enviamos algo al carrito')
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: 'ocurrio un error al agregar un elemento al carrito'})
    }
}