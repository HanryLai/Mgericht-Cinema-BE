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
//ADMIN

export const deleteUser = async (id: string) => {
    try {
        const userDeleted = await UserModel.findByIdAndDelete(id);
        if (!userDeleted) {
            throw new Error('Not found user with id ');
        }
        return userDeleted;
    } catch (error) {
        throw error;
    }
};

export const loginAdmin = async (user: DocumentDefinition<UserProps>) => {
    try {
        const foundUser = await UserModel.findOne({ username: user.username });
        if (!foundUser) {
            throw new Error('admin not found');
        }
        const isMatch = bcrypt.compareSync(user.password, foundUser.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }
        const isAdmin = foundUser.role === Role.ADMIN;
        if (!isAdmin) {
            throw new Error("You're not admin");
        }
        const verificationToken = generateToken(foundUser.id, foundUser.role);
        foundUser.verificationToken = verificationToken;
        await foundUser.save();
        return foundUser;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id: string, user: DocumentDefinition<UserProps>) => {
    try {
        let foundUser = await UserModel.findById(id);
        if (!foundUser) {
            throw new Error(`not found user with id ${id}`);
        }
        if (user.password) {
            user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT as string));
        }
        Object.assign(foundUser, user);
        foundUser.save();
        return foundUser;
    } catch (error) {
        throw error;
    }
};
