import express, { Application } from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

class Server {
    
    private app : Application;
    private port : string; 
    private apiPaths = {
        users: "/users"
    }
    
    constructor (){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    connectDB(){
        db.authenticate()
        .then(res => {
            console.log("Connection successful");
        })
        .catch(error => {
            console.log(error);
        });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running in port : ${this.port}`);
        });
    }
}


export default Server;