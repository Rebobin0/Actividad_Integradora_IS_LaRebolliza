import express from 'express'

const server = express()

//Routing
server.get('/', (req, res) => {
    const datos = [
        { id: 1, nombre: 'Emiliano' },
        { id: 2, nombre: 'Gaspar' },
    ]

    res.send(datos)
})

export default server