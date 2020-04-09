import {UserModel, IUser} from '../models/user';
import {Controller, Route, Post, BodyProp, Put, Delete, Get, Security,Request} from 'tsoa';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {parseToken} from '../token.helper'

@Route('/user')
export class UserController extends Controller{
    @Security('jwt',["admin", "manager", "user"])
    @Get()
    public async getAll():Promise<IUser[]> {   
        console.log('sss1');           
        try{
            let items:any = await UserModel.find({});
            items = items.map((item: IUser)=>{
                return {
                    id: item._id,
                    email: item.email,
                    role: item.role

                }
            });
            return items;         
        }
        catch(err){
            this.setStatus(500);            
            console.error('Caught error',err);
        }
    };
   
    @Security('jwt',["admin", "manager"])
    @Post()
    public async create(@BodyProp() email: string, @BodyProp() role: string, @Request() request: express.Request): Promise<void>{

        const user = parseToken(request);
        if(user.role == "admin" || (user.role == "manager" && role !== "admin")) 
        {
            const item = new UserModel({email:email, role:role,password:1});
            item.save();
        }
    };

    @Security('jwt',["admin", "manager"])
    @Put('/{id}')
    public async update(id: string, @BodyProp() email: string, @BodyProp() password: string, @BodyProp() role: string, @Request() request: express.Request): Promise<void>{

        const user = parseToken(request);
        if(user.role == "admin" || (user.role == "manager" && role !== "admin")) 
        {
            await UserModel.findByIdAndUpdate(id,{
                'password':password,
                'email':email,
                'role':role
            });
        }
        
    };

    @Security('jwt',["admin"])
    @Delete('/{id}')
    public async delete(id: string,@Request() request: express.Request): Promise<void>{
        
        const user = parseToken(request);
        if(user.id !== id) 
        {
            await UserModel.findByIdAndDelete(id);
        }
        
    };
};

