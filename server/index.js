import  express  from "express";
import logger from "morgan";

import { Server } from "socket.io"
import { createServer } from "node:http"


const port = process.env.PORT ?? 3001

const app= express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery : {}
})

io.on('connection', (socket) => {
    console.log('a user has connected!')

    socket.on('disconnet', () => {
        console.log('a user has connected!')
    })

 // comunicación del cliente al servidor
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg)
        io.emit('chat message', msg)
    })  
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
}) 

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})