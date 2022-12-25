import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';


class AuthService {

    static async hashPassword(password) {
        return await bcrypt.hash(password,12);
    }

    static async createUser(user){
        try{
            if(user.password.length > 4){
                const hashedPassword = this.hashPassword(user.password);
            }else{
                return ""
            }
        }catch(error){

        }
    }
}

module.exports = AuthService;