import express, { Application } from 'express';
import http from 'http';
import socketio from 'socket.io';
import { databaseConnect } from '../database/connection';
import Socket from './socket'; // server socket

class Server {
    private app: Application;
    private server: http.Server;
    private io: socketio.Server;
    private port: string;

    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketio.Server(this.server);
        

        this.port = process.env.PORT || '3001';

        this.connect();
        this.routes();
        this.setupSockets();
    }

    private setupSockets = () => {
        new Socket(this.io);
    }

    private connect = async () => {
        await databaseConnect();
    }

    private routes(){
        // Todo: routes
    }

    public listen(){


        this.server.listen(this.port, () => {
            console.log(`Listening on port: ${ this.port }`)
        });
    }

}

export default Server;
