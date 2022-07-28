import { response } from "express";
import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import { validationResult } from "express-validator";

export const getUser = async(req = request, res = response) => {
    const query = { state: true };
    const { limit = 5, from = 0 } = req.query;

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
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
    const user = new User({ name , email, password, rol});

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

    const user = await User.findByIdAndUpdate(id, params);
    
    resp.json({
        msg: 'Put API - controller',
        user
    });
};

export const deleteUser = async(req, resp = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state: false} );

    resp.json(user)
}


