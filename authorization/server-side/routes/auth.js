const controller = require('./../controllers/auth');
const verifySignUp = require('../middleware/verifySignUp');

module.exports = function(app) {
    app.use(function(req, res,next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token');
        next();
    });

    app.post("/api/auth/signup", [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRoleExisted
    ], controller.signup);

    app.post("/api/auth/signin", controller.signin);
};