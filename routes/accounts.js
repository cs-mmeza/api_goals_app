var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var router = express.Router();
const { body, validationResult } = require('express-validator');
const { requestAccount, create } = require('../db/requests');

/* POST create account . */
router.post('/signup',
    body('username').isEmail(),
    body('password').isLength({ min: 5 }),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newAccount = req.body;
        bcrypt.hash(newAccount.password, 12, function (err, hash) {
            if (err) {
                return next(err);
            }
            create('accounts', { username: newAccount.username, hash }, (err, account) => {
                if (err) {
                    return next(err);
                }
                res.send(account);
            });
        });
    });

/* POST login . */
router.post('/login',
    body('username').isEmail(),
    body('password').isLength({ min: 5 }),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const login = req.body;
        requestAccount(login.username, (err, [account]) => {
            if (err) return next(err);
            if (!account) return res.sendStatus(404);
            bcrypt.compare(login.password, account.hash, function (err, result) {
                if (err) return next(err);
                if (!result) return res.sendStatus(401);
                let file = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60,
                    id: account.id
                  }, 'secret');
                  
                res.send({token: file});
            });
        });
    });


module.exports = router;