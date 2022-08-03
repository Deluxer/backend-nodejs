import { response } from "express";
import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async(req, resp = response) => {

    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email });
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

        const validatePassword = bcryptjs.compareSync(password, user.password);
        if ( !validatePassword ) {
            return resp.status(400).json({
                msg: 'Password do not match'
            });
        }

        const token = await generateJWT( user.id );

        resp.json({
            user,
            token
        })
    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            msg: 'Error, communicate with admonistrator'
        })
    }

}