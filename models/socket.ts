import socketio from 'socket.io';
import { validateJWTSocket } from '../helpers/validateJWTSocket';
import { getUsers, saveMessage, userConnect } from '../controllers/socket';

class Socket {
    private io: socketio.Server;

    constructor(io: socketio.Server){
        this.io = io;

        this.socketEvents();
    }

    private socketEvents(){
        // Socket events must be placed here
        this.io.on(`connection`, async socket => {   
            const authToken = socket.handshake.query['auth-token'];

            // TODO: validar el JWT y sacar el base_user
            const { ok, base_user } = validateJWTSocket(`${ authToken }`);
            
            if (!ok){
                return socket.disconnect();
            }
            console.log('usuario conectado: ', base_user)
            // TODO: marcar como conectado al usuario
            await userConnect(base_user!, true); 

            
            // TODO: emitir los usuarios conectados
            this.io.emit('user-list', await getUsers())
            
            // TODO: unir a usuario/s a una sala (socket.join) con el id del usuario
            socket.join(`room ${ base_user }`);
            
            // TODO: escuchar envio de mensajes del cliente
            socket.on('send-new-message', async data => {
                const newMessage = await saveMessage(data);
                this.io.to(`room ${ newMessage.from }`).emit('received-new-message', newMessage);
                this.io.to(`room ${ newMessage.to }`).emit('received-new-message', newMessage);
            })

            // TODO: desconectar al usuario (online: false en el modelo)
            socket.on('disconnect', async () => {
                console.log('desconectando usuario', base_user);
                await userConnect(base_user!, false); 
                this.io.emit('user-list', await getUsers());
            });
        });
    }
}

export default Socket;