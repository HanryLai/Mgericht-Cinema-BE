import { DocumentDefinition } from 'mongoose';
import { IUser, userModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as jose from 'jose';
class UserService {
    public static register = async (user: DocumentDefinition<IUser>) => {
        try {
            const holderUser = await userModel.findOne({ username: user.username, email: user.email }).lean<user>(true);
            if (holderUser) {
                throw new Error('Username or email is already taken');
            }

            // hash password
            const { publicKey, privateKey } = await jose.generateKeyPair('RSA', {
                modulusLength: 2048,
            });
        } catch (err) {}
    };
}

export default UserService;
