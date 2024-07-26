const User = require('../models/user');

exports.getSignIn = (req, res) => {
    return res.render('signin');
};

exports.getSignUp = (req, res) => {
    return res.render('signup');
};

exports.postSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie('token', token).redirect("/");
    } catch (error) {
        return res.render('signin', {
            error: 'Incorrect Email or Password'
        });
    }
};

exports.getLogout = (req, res) => {
    res.clearCookie('token');
    return res.redirect("/");
};

exports.postSignUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        await User.create({
            fullName,
            email,
            password
        });

        return res.redirect("/");
    } catch (error) {
        return res.render('signup', {
            error: 'Error creating account. Please try again.'
        });
    }
};