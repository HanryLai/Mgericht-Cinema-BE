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

          /* This code snippet is creating a new user document in the database using the Mongoose model
          `userModel`. */
            const newUser = await userModel.create({
                ...user,
                password: hashedPassword,
            });

            if (newUser) {
               /* This code snippet is generating a new RSA key pair synchronously using Node.js's
               built-in `crypto` module. The `crypto.generateKeyPairSync` method is used to generate
               a new key pair for asymmetric encryption using the RSA algorithm. */
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4069,
                });

                /* This line of code is calling a method `createKeyToken` from the `KeyTokenService`
                class with an object containing `userId` and `publicKey` as parameters. The purpose
                of this method is to create a key token for the given user ID and public key. The
                `createKeyToken` method likely generates a token based on the provided data, which
                can be used for authentication or encryption purposes. */
                const publicKeyString = await KeyTokenService.createKeyToken({ userId: newUser.id, publicKey });

                if (!publicKeyString) {
                    return {
                        status: 500,
                        message: 'Error creating public key',
                    };
                }

               /* The code snippet `const tokens = await createTokenPair({ userId: newUser._id, email:
               newUser.email }, publicKey, privateKey);` is generating a pair of tokens for the
               newly created user. */
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
