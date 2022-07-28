import Role from "../models/role.js";
import User from "../models/user.js";

export const isRoleValid = async( rol = '' ) => {
    const existRol = await Role.findOne({ rol });

    if( !existRol ) {
        throw new Error(`The ${ rol } does not exist`);
    }
}

export const existEmail = async( email = '') => {
    const existEmail = await User.findOne({ email });

    if( existEmail ) {
        throw new Error(`The email ${ email } already exist `)
    }
}

export const findUserById = async( id ) => {
    const existUser = await User.findById(id);

    if( !existUser ) {
        throw new Error(`The id ${ id } does not exist `);
    }
}