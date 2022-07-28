import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = Schema({
    name: {
        type: String,
        requried: [
            true,
            'Name required'
        ]
    },
    email: {
        type: String,
        requried: [
            true,
            'Email required'
        ]
    },
    password: {
        type: String,
        requried: [
            true,
            'password required'
        ]
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        requried: [
            true,
            'Rol required'
        ],
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

export default model('User', UserSchema);