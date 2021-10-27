const jwt = require('jsonwebtoken');
const Public = require('../models/publicSchema');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.authCookie;
        const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
        const tokenRoot = await Public.findOne({ _id: tokenVerify._id, 'tokenField.token' : token});

        if(!tokenRoot) { 
            throw new Error( 'user not found')
        }

        req.token = token;
        req.tokenRoot = tokenRoot;
        req.userID = tokenRoot._id;

        next();


    } catch (err) {
        console.error(err)
        res.status(401).send(`unauthorized: no token provided!`);
    }
}
module.exports = authenticate;