const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
    const {name, picture, email} = req.user;
    const user = await User.findOneAndUpdate(
        {email},
        {name: email.split('@')[0], picture},
        {new: true}
    );

    if (user) {
        // console.log('USER UPDATED ', user);
        res.json(user);
        return;
    } else {
        const newUser = await new User({
            email,
            name: email.split('@')[0],
            picture,
        }).save();
        // console.log('USER CREATED ', newUser);
        res.json(newUser);
        return;
    }
};

exports.currentUser = async (req, res) => {
    // console.log(req.user.email);
    User.findOne({email: req.user.email}).exec((err, user) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(user);
        }
    })
};