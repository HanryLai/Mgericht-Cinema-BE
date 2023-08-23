import { UserModel } from '../../models/users/user.model';
import mongoose from 'mongoose';
import { getErrorMessage } from '../err/errorMessage';
export const validateID = (id: string) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    !isValid && new Error('Invalid ID');
};

export const isAdminExist = async (id: string) => {
    const admin = await UserModel.findById(id);
    if (admin == null) {
        throw new Error('Admin is not exist');
    }
    return admin;
};
