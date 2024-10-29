import mongoose from 'mongoose';
import { UserModel, UserProps } from '../../models/users/user.model';
export const ownerValid = async (id: string, token: string) => {
    const foundUser = await UserModel.findById(id);
    if (!foundUser) {
        throw new Error(`Not found account ${id}`);
    }
    const isOwn = token === foundUser.verificationToken;
    if (!isOwn) {
        throw new Error("you're not this own's account");
    }
    return foundUser;
};
