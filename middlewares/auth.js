const jwt = require('jsonwebtoken');

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decodedToken) => {
            if (err) {
                return res.status(403).send({msg: 'Invalid auth token'});
            }else{
                // const {id, email} = decodedToken
                req.email = decodedToken.email;
                next();
            }
        });
    } else {
        res.status(401).send({ msg: "Auth token needed!"});
    }
};

module.exports = { authenticateJWT };