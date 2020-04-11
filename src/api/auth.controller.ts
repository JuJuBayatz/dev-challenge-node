import {UserModel, IUser} from '../models/user';
import {Controller, Route, Post, BodyProp} from 'tsoa';
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
        const item:any = await UserModel.findOne({email:email, password:password});
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

