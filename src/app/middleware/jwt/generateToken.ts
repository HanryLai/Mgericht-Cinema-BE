import * as jwt from 'jsonwebtoken';

export const generateToken = (id: string, role: string) => {
    const token = jwt.sign({ refreshToken: id, role: role }, process.env.JWT_SECRET as string, {
        expiresIn: '30m',
    });
    return token;
};
