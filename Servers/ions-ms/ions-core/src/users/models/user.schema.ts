import * as mongoose from 'mongoose';
import { Constants } from '../../common/helpers/constants';

export const UserSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    phone: String,
    name: String,
    role: String
}, {
    discriminatorKey: 'role' 
});

export const AdminSchema = new mongoose.Schema({
    accessLevel: String
});

export const HomeUserSchema = new mongoose.Schema({
    gender: String,
    dob: String,
    ic: String,
    education: String,
    jobTitle: String
});

export const userDiscriminators = (user) => {
    user.discriminator(Constants.User.Role.ADMIN, AdminSchema);
    user.discriminator(Constants.User.Role.HOMEUSER, HomeUserSchema);
}
