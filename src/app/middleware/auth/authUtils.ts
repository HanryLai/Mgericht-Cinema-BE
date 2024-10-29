import * as JWT from 'jsonwebtoken';
export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}
export const createTokenPair = async (payload: any, publicKey, privateKey): Promise<ITokenPair> => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days',
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        });

        // Verify tokens and return them
        await Promise.all([JWT.verify(accessToken, publicKey), JWT.verify(refreshToken, publicKey)]);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error(`Error creating token pair: ${error}`);
        throw new Error(error);
    }
};
