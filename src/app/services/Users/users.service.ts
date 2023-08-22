import mongoose from 'mongoose';
import { DocumentDefinition } from 'mongoose';
import { UserModel, UserProps } from '../../models/users/user.model';
import { ownerValid } from '../../utils/validations/owner';
import { Role } from '../../models/users/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateToken } from '../../middleware/jwt/generateToken';
declare global {
    interface userWithOutPassword {
        password?: string;
    }
}

export const register = async (user: DocumentDefinition<UserProps>) => {
    try {
        const foundUser = await UserModel.findOne({ username: user.username });
        if (foundUser) {
            throw new Error('User already exist');
        }
        const hash_salt = parseInt(process.env.BRCYPT_SALT as string);
        const hasdedPassword = bcrypt.hashSync(user.password, hash_salt);
        const newUser = await UserModel.create({
            ...user,
            password: hasdedPassword,
        });
        return newUser;
    } catch (error) {
        throw error;
    }
};

export const login = async (user: DocumentDefinition<UserProps>) => {
    try {
        const foundUser = await UserModel.findOne({ username: user.username });
        if (!foundUser) {
            throw new Error('User not found');
        }
        const isMatch = bcrypt.compareSync(user.password, foundUser.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }
        const verificationToken = generateToken(foundUser.id, foundUser.role);
        foundUser.verificationToken = verificationToken;
        await foundUser.save();
        return foundUser;
    } catch (error) {
        throw error;
    }
};

export const logout = async (token: string) => {
    try {
        // const foundUser = await UserModel.findById(id);
        // const secret_key = process.env.SECRET_KEY;
        // if (!foundUser) {
        //     throw new Error('User not found to logout');
        // }
        const foundUser = await UserModel.findOne({ verificationToken: token });
        if (!foundUser) {
            throw new Error('You\re not login before');
        }
        foundUser.verificationToken = null;
        await foundUser.save();
        return foundUser;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const allUsers = await UserModel.find({});
        if (!allUsers) {
            throw new Error('Not found any users');
        }
        return allUsers;
    } catch (error) {
        throw error;
    }
};

export const getUser = async (id: string) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error(`Not found user with id ${id}`);
        }
        return user;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async (id: string, oldToken: string) => {
    try {
        const foundUser = await UserModel.findById(id);
        if (!foundUser) {
            throw new Error(`Not found user with id ${id}`);
        }
        const isMatch = foundUser.verificationToken == oldToken;
        if (!isMatch) {
            throw new Error(`you not login`);
        }
        const newToken = generateToken(id, foundUser.role);
        foundUser.verificationToken = newToken;
        await foundUser.save();
        return foundUser;
    } catch (error) {
        throw error;
    }
};

// export const resetPassword = async (token:string) => {

// };

export const forgetPassword = async (username: string, email: string, newPassword: string) => {
    try {
        const foundUser = await UserModel.findOne({ username: username });
        if (!foundUser) {
            throw new Error('Not found username');
        }
        const isMatch = foundUser.email == email;
        if (!isMatch) {
            throw new Error('Wrong email');
        }
        const hashedPassword = bcrypt.hashSync(newPassword, parseInt(process.env.BCRYPT_SALT as string));
        foundUser.password = hashedPassword;
        await foundUser.save();
        const { password, ...userNotPassword } = foundUser;
        return userNotPassword;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (id: string, token: string, password: string, newPassword: string) => {
    const foundUser = await ownerValid(id, token);
    const isMatchPassword = bcrypt.compareSync(password, foundUser.password);
    if (!isMatchPassword) {
        throw new Error('Incorrect current password');
    }
    const hasdedPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT as string));
    const newToken = generateToken(id, foundUser.role);
    foundUser.password = hasdedPassword;
    foundUser.verificationToken = newToken;
    await foundUser.save();
    let user: userWithOutPassword = { ...foundUser.toObject() };
    delete user.password;
    return user;
};

export const updateUser = async (id: string, token: string, user: DocumentDefinition<UserProps>) => {
    try {
        let foundUser = await ownerValid(id, token);
        const fotmatUser = {
            email: user.email,
            username: user.username,
            address: user.address,
            phone: user.phone,
        };
        // user.password = foundUser.password;
        Object.assign(foundUser, fotmatUser);
        await foundUser.save();
        return foundUser;
    } catch (error) {
        throw error;
    }
};
