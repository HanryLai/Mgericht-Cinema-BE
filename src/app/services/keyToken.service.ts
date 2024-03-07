import { keyModel } from '../models/token.model';

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await keyModel.create({
                user: userId,
                publicKey: publicKeyString,
            });
            return tokens ? publicKeyString : null;
        } catch (err) {
            throw new Error(err);
        }
    };
    static getPublicKey = async (userId: string) => {
        try {
            const publicKey = await keyModel.findOne({ user: userId });
            return publicKey ? publicKey.publicKey : null;
        } catch (err) {
            throw new Error(err);
        }
    };
}
export default KeyTokenService;
