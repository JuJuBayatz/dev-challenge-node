import * as mongoose from 'mongoose';

interface IUser{
    _id:string,
    email:string,
    password: string,
    role: string
};

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String, enum: ['admin', 'manager', 'user'] }

});

const UserModel = mongoose.model('User',UserSchema);
export {UserModel, IUser}
