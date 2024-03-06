import { DocumentDefinition } from 'mongoose';
import { IUser, userModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import KeyTokenService from './keyToken.service';
import { getErrorMessage } from '../utils/err/errorMessage';
import { createTokenPair } from '../auth/authUtils';

import * as crypto from 'crypto';
class UserService {
    public static register = async (user: DocumentDefinition<IUser>) => {
        try {
            const holderUser = await userModel
                .findOne({ username: user.username, email: user.email })
                .lean<IUser>(true);
            if (holderUser) {
                throw new Error('Username or email is already taken');
            }

            // hash password
            const hashedPassword = await bcrypt.hash(user.password, 10);

            const newUser = await userModel.create({
                ...user,
                password: hashedPassword,
            });

            if (newUser) {
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4069,
                });

                const publicKeyString = await KeyTokenService.createKeyToken({ userId: newUser.id, publicKey });

                if (!publicKeyString) {
                    return {
                        status: 500,
                        message: 'Error creating public key',
                    };
                }

                const tokens = await createTokenPair(
                    { userId: newUser._id, email: newUser.email },
                    publicKey,
                    privateKey
                );
                console.log(tokens);
                return {
                    code: 201,
                    metadata: {
                        user: newUser,
                        token: tokens,
                    },
                };
            }
        } catch (err) {
            return {
                code: 500,
                message: getErrorMessage(err),
                status: 'err',
            };
        }
    };
}

export default UserService;
