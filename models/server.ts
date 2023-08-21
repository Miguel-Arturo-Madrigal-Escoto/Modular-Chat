import express, { Application } from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';

import { databaseConnect } from '../database/connection';
import Socket from './socket'; // socket server
import authRoutes from '../routes/auth'
import messagesRoutes from '../routes/messages'

class Server {
    private app: Application;
    private server: http.Server;
    private io: socketio.Server;
    private port: string;

    private apiRoutes = {
        auth: '/api/auth',
        messages: '/api/messages',
    }

    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketio.Server(this.server);
        this.port = process.env.PORT || '3001';

        databaseConnect();

        this.middlewares();
        this.routes();
        this.setupSocketServer();
    }

    private setupSocketServer = () => {
        new Socket(this.io);
    }

    private middlewares(){
        this.app.use(cors());

        // Body parse middleware
        this.app.use(express.json());
    }

    private routes(){
        this.app.use(this.apiRoutes.auth, authRoutes);
        this.app.use(this.apiRoutes.messages, messagesRoutes);
    }

    public listen(){
        this.server.listen(this.port, () => {
            console.log(`Listening on port: ${ this.port }`);
        });
    }

}

export default Server;
