import {app} from './app';
import * as http from 'http';
import * as mongoose from 'mongoose';
import { UserModel } from './models/user';
import { passwordHasher } from './helpers/authentication';

const server = http.createServer(app);

const PORT = process.env['PORT'];
server.listen(PORT);

server.on('listening', async ()=>{
    console.log(`Listening on port ${PORT}`);
    const MONGO_URI = process.env['MONGODB_URI'];
    mongoose.connect(MONGO_URI, { 
        useUnifiedTopology: true,
        useNewUrlParser: true,  
        useFindAndModify: false 
    });

    mongoose.connection.on('open',()=>{
        console.log('Mongo connection opened');

        const email = process.env['INITIAL_ADMIN_EMAIL'];
        UserModel.countDocuments({email: email}).then((count)=>{
            if(!count){
                console.log('Seeding initial user');
                const password = passwordHasher(process.env['DEFAULT_PASSWORD']);
                const item = new UserModel({email:email, role:'admin', password:password});
                item.save();
            }
        })
    });

    mongoose.connection.on('error',(err:any)=>{
        console.error(err);
    });

    
});