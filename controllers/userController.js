import { response } from "express";

export const getUser = (req = request, res = response) => {

    const { q, name, apiKey, page = 1, limit} = req.query;

   res.json({
        msg: 'get API - controller',
        q,
        name,
        apiKey,
        page
    });
}

export const postUser = (req, resp = response ) => {

    const { name, age } = req.body;

    resp.json({
        msg: 'Put API - controller',
        name,
        age
    });
};

export const putUser = (req, resp = response) => {

    const params = req.params
    resp.json({
        msg: 'Put API - controller',
        id: params.userId
    });
};

export const deleteUser = (req, resp = response) => {
    resp.json({
        msg: 'Delete API - controller'
    });
}


