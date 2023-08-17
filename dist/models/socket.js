"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Socket {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // Socket events must be placed here
        this.io.on(`connection`, socket => {
            console.log(`Cliente conectado: ${socket.id}`);
            // this.io.emit('sum', 1 + 1); emitir a todos
            // socket.broadcast.emit('sum', 1 + 1); emitir a todos menos el
            // socket.on('mensaje', data => { // escuchar y emitir a todos
            //     console.log(data)
            //     this.io.emit('ejemplo', data)
            // })
        });
    }
}
exports.default = Socket;
//# sourceMappingURL=socket.js.map