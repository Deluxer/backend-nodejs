import { json, response } from "express";
import UserModel from "../models/UserModel.js";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";

export const getUser = async(req = request, res = response) => {
    const query = { state: true };
    const { limit = 5, from = 0 } = req.query;

    const [ total, users ] = await Promise.all([
        UserModel.countDocuments(query),
        UserModel.find(query)
            .skip( from )
            .limit( limit )
    ])

   res.json({
        total,
        users
    });
}

export const postUser = async(req, resp = response ) => {

    const { name, email, password, rol } = req.body;
    const user = new UserModel({ name , email, password, rol});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    resp.json({
        msg: 'Put API - controller',
        user
    });
};

export const putUser = async(req, resp = response) => {

    const { id } = req.params
    const { _id, password, gogle, email, ...params} = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        params.password = bcryptjs.hashSync(password, salt);
    
    }

    const user = await UserModel.findByIdAndUpdate(id, params);
    
    resp.json({
        msg: 'Put API - controller',
        user
    });
};

export const deleteUser = async(req, resp = response) => {

    const { id, uid } = req.params;
    const user = await UserModel.findByIdAndUpdate( id, { state: false} );

    if ( !user) {
        return resp.status(401).json({
            msg: 'User nor found'
        });
    }

    if( user.state ) {
        return resp.status(401).json({
            msg: 'Token no valido'
        });
    }

    resp.json( user )
}