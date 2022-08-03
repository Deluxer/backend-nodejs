import { request, response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const validateJWT = async(req = request, resp = response, next ) => {

    const token = req.header('x-token');
    if( !token ) {
        return resp.status(401).json({
            msg: 'No existe token'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await UserModel.findById(uid);

        if ( !user ) {
            return resp.status(400).json({
                msg: 'User does not exist'
            })
        }

        if ( !user.state ) {
            return resp.status(400).json({
                msg: 'User inactive'
            })
        }
        
        req.user = user;
        
        next();

    } catch(err) {
        console.log(err);
        resp.status(401).json({
            msg: 'Token no valido'
        })
    }

}