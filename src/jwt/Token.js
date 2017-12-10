const jwt = require('jsonwebtoken');

exports.create = (user, secret) => {
    let payload = {
        email: user.email
    };
    return jwt.sign(payload, secret, {
        expiresIn: 24 * 60 * 60
    });
};

exports.validate = (token, secret, callback) => {
    if (!token) {
        callback(new Error("Token cannot be null"));
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            callback(err);
        }
        callback(null, decoded);
    });
};

//TODO destroy current token
exports.destroy = () => {

};