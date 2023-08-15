const jwt = require('jsonwebtoken');

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401).json({errors: { message: "Auth token needed!"}});
    }
};
