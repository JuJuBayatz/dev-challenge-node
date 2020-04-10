import {UserModel, IUser} from '../models/user';
import {Controller, Route, Post, BodyProp} from 'tsoa';
import * as jwt from 'jsonwebtoken';

interface loginModel{
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
    public async login(@BodyProp() email: string, @BodyProp() password:string): Promise<loginModel>{
        const item:any = await UserModel.findOne({email:email, password:password});
        const token = jwt.sign({email: item.email, role: item.role, id: item._id}, process.env['TOKEN_SECRED']);
        return {
            token: token,
            user: {
                email: item.email,
                role: item.role,
                id: item._id
            }
        };
    };
};

