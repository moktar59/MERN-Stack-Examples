const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({err: "Authentication failed. Error: No authentication token found."});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({err: "Invalid authentication token."});
        }

        req.user = verified.id;
        console.log('verified.id=', verified.id);

        next();
    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
};

module.exports = auth;