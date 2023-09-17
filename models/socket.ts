import socketio from 'socket.io';
import { validateJWTSocket } from '../helpers/validateJWTSocket';
import { getMatchedUser, getUsers, saveMessage, userConnect } from '../controllers/socket';

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

            // * validar el JWT y sacar el base_user
            const { ok, base_user } = validateJWTSocket(`${ authToken }`);
            
            if (!ok){
                return socket.disconnect();
            }
            // * marcar como conectado al usuario
            await userConnect(base_user!, true); 
            // console.log('usuario conectado: ', base_user)
         
            // * emitir los usuarios conectados
            this.io.emit('user-list', await getUsers())
            // console.log('emitiendo usuarios')
            
            // * unir a usuario/s a una sala (socket.join) con el id del usuario
            socket.join(`room ${ base_user }`);
            
            // * escuchar envio de mensajes del cliente
            socket.on('new-message', async data => {
                const newMessage = await saveMessage(data);
                this.io.to(`room ${ newMessage.from }`).emit('new-message', newMessage);
                this.io.to(`room ${ newMessage.to }`).emit('new-message', newMessage);
            })

            // * escuchar si hay un nuevo match
            socket.on('new-match', async data => {
                const from = await getMatchedUser(data.from);
                const to = await getMatchedUser(data.to);
                this.io.to(`room ${ from?.base_user }`).emit('new-match')
                this.io.to(`room ${ to?.base_user }`).emit('new-match')
            })

            // * desconectar al usuario (online: false en el modelo)           
            socket.on('disconnect', async () => {
                // console.log('desconectando usuario', base_user);
                await userConnect(base_user!, false); 
                this.io.emit('user-list', await getUsers());
            });
        });
    }
}

export default Socket;