import {UserModel, IUser} from '../models/user';
import {Controller, Route, Post, BodyProp} from 'tsoa';
import { passwordHasher, hashCompare } from '../helpers/authentication';
import * as jwt from 'jsonwebtoken';

interface LoginModel{
    token: string,
    user: {
        email: string,
        role: string,
        id:string
    }
}

@Route('/login')
export class AuthController extends Controller{

    @Post()
    public async login(@BodyProp() email: string, @BodyProp() password:string): Promise<LoginModel>{
     
        const item:any = await UserModel.findOne({email:email});
        if(item && hashCompare(password, item.password)){
            const user = {
                email: item.email, 
                role: item.role, 
                id: item._id
            };
            const token = jwt.sign(user, process.env['TOKEN_SECRED']);

            return {
                token: token,
                user: user
            };
        }
        else{
            this.setStatus(401);
        }
    };

    @Post('loginOpenId')
    public async loginOpenId(@BodyProp() email: string, @BodyProp() jwtIdToken: string): Promise<LoginModel>{

        const decoded = jwt.decode(jwtIdToken);
        const item:any = await UserModel.findOne({email:decoded['email']});
        if(item){

            const user = {
                email: item.email, 
                role: item.role, 
                id: item._id
            };

            const token = jwt.sign(user, process.env['TOKEN_SECRED']);

            return {
                token: token,
                user: user
            };
        }
        else{
            this.setStatus(401);
        }
    };
};

