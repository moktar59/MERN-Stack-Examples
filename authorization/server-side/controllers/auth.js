const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('./../config/auth');
const db = require('./../models');

const Role = db.role;
const User = db.user;

exports.signup = (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({message: err});
        }

        if (req.body.roles) {
            Role.find({name: {$in: req.body.roles}}, (err, roles) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                }

                user.roles = roles.map(role => role._id);

                user.save(err => {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        });
                    }

                    return res.send({message: "User has registered successfully."});
                });
            });
        } else {
            Role.findOne({name: "user"}, (err, role) => {
                if (err) {
                    return res.status(500).send({message: err});
                }

                user.roles = [role._id];

                user.save(err => {
                    if (err) {
                        return res.status(500).send({message: err});
                    }

                    return res.status(200).send({message: "User Registered successfully."});
                });
            })
        }
    })
};

exports.signin = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return res.status(500).send({message: err});
        }

        if (!user) {
            return res.status(500).send({message: "User not found."});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                token: null,
                message: "Wrong password."
            });
        }


        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        });

        var authorities = [];


        for (let i = 0; i < user.roles.length; i++) {
            // authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            authorities.push("ROLE_" + user.roles[i]);
        }

        return res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};