import{app} from './app';
import * as http from 'http';
import * as mongoose from 'mongoose';

const PORT = 8080;
const MONGO_URI = 'mongodb://localhost:27017/DevChallenge';

const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async ()=>{
    console.log(`Listening on port ${PORT}`);
    mongoose.connect(MONGO_URI,{ useUnifiedTopology: true,useNewUrlParser: true,  useFindAndModify: false });
    mongoose.connection.on('open',()=>{
        console.log('Mongo connection opened');
    });
    mongoose.connection.on('error',(err:any)=>{
        console.error(err);
    });

    
});