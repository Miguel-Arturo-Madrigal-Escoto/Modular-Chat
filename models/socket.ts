import socketio from 'socket.io';

class Socket {
    private io: socketio.Server;

    constructor(io: socketio.Server){
        this.io = io;

        this.socketEvents();
    }

    private socketEvents(){
        // Socket events must be placed here
        this.io.on(`connection`, socket => {
            console.log(`Cliente conectado: ${ socket.id }`); 
            
            // this.io.emit('sum', 1 + 1); emitir a todos
            // socket.broadcast.emit('sum', 1 + 1); emitir a todos menos el
            
            // socket.on('mensaje', data => { // escuchar y emitir a todos
            //     console.log(data)
            //     this.io.emit('ejemplo', data)
            // })
        });
    }
}

export default Socket;