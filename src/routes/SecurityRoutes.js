const User = require('../models/User');
const Show = require('../models/Show');
const token = require('../jwt/Token');
const keys = require('../../config/keys');

module.exports = (app) => {
    app.post('/register', (req, res) => {
        User.create({ email: req.body.email, password: req.body.password }).then((user) => {
            res.json(token.create(user, keys.secret));
        }).catch((err) => {
            throw new Error("Failed creating user \n Error " + err.message);
        });


        // usersRepo.register(req, (err, newUser) => {
        //     if (err) {
        //         res.status(400).send(err.message);
        //     } else {
        //         res.status(201).send({token: token.create(newUser, keys.secret)});
        //     }
        // });
    });

    // app.post('/login', (req, res) => {
    //     usersRepo.getByEmail('asdassfsd.com', (err, user) => {
    //         if (err) {
    //             throw err;
    //         }
    //         if (!user) {
    //             res.status(404).send("Not found");
    //         } else {
    //             res.status(200).send(user);
    //         }
    //     });
    // });

    app.all('/api/*', (req, res, next) => {
        //TODO remove this skip after finishing the implementation for token auth
        return next();

        let reqToken = req.headers['x-access-token'];
        token.validate(reqToken, keys.secret, (err, decoded) => {
            if (err) {
                res.status(403).send("Access denied!");
            }
            req.token = decoded;
        });
        next();
    });

    app.get('/api/login', (req, res) => {
        res.send(req.token);
    });
};