const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require("../models/user-model");

router.post('/test', (req, res) => {
    return res.json({m: 'test', kl: req.body.email});
});

router.post('/register', async (req, res) => {
    try {

    let {email, password, passwordCheck, displayName} = req.body;

    if (!(Boolean(email) && Boolean(password) && Boolean(displayName)))
    {
        return res.status(400).json({err: "Not all required fields are provided."});
    }
    if (password.length < 6) {
        return res.status(400).json({err: "Password should be at least 6 characters"});
    }
    
    if (password !== passwordCheck) {
        return res.status(500).json({err: "Password and confirm password does not match."});
    }
    
    const isUserIxist = await User.findOne({email})
    if (isUserIxist) {
        return res.status(500).json({err: "User already exist."});
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        email: email,
        password: hashedPassword,
        displayName: displayName
    });
    const savedUser = await newUser.save();

    return res.status(200).json(savedUser);
    } catch (err) {
        return res.status(500).json({err: err.message});
    }    
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(Boolean(email) && Boolean(password))) {
            return res.status(400).json({err: "Both email and password fields are required."});
        }

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(401).json({err: "Authentication failed. Wrong email."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({err: 'Authentication failed. Wrong password.'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName
            }
        });
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
    
});

router.delete('/delete', auth, async (req, res) => {
    try {
        
        console.log('req.user=', req.user);
        const deletedUser = await User.findByIdAndDelete(req.user);

        return res.json(deletedUser);
    } catch (err) {
        return res.status(500).json({err: 'Failed to delete user.'});
    }
});

router.get('/',auth, async (req, res) => {
    try {
        const user = await User.find();

        return res.json({user: user});
    } catch (err) {
        return res.status(500).json({
            err: err.message
        });
    }
});

router.post('/tokenIsValid', async (req, res) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.json(false);
    }

    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
        return res.json(false);
    }

    const user = await User.findById(verified.id);

    if (!user) {
        return res.json(false);
    }

    return res.json(true);
});

router.get('/user', auth, async (req, res) => {
    const userDetail = await User.findById(req.user);

    return res.json(userDetail);
});

module.exports = router;