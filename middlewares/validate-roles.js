export const isAdmin = ( req, resp = response, next ) => {
    
    if( !req.user ) {
        return resp.status(500).json({
            msg: 'Verify role user'
        })
    }
    const { rol, name } = req.user;
    if( rol !== 'ADMIN_ROLE') {
        return resp.status(401).json({
            msg: `User ${ name} is not admin`
        });
    }

    next();
}

export const hasRole = ( ...roles ) => {

    return ( req, resp = response, next ) => {
        
        if( !req.user ) {
            return resp.status(500).json({
                msg: 'Verify role user'
            })
        }

        if ( !roles.includes(req.user.rol)) {
            return resp.status(401).json({
                msg: 'User do not have a role allowed'
            })
        }

        next()
    }

}