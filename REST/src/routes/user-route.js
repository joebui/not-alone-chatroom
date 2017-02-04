const mongoose = require('mongoose')

const userService = require('../services/user-service')

module.exports = (app) => {
    /** Get all users */
    app.get('/api/users', (req, res) => {
        userService.findAllUserService()
            .then((value) => {
                res.status(200).json(value)
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    })

    /** Update an user account */
    app.put('/api/users/:id', (req, res) => {
        userService.editUserAccountService(req.params.id, req.body)
            .then((value) => {
                if (value.ok === 1) {
                    res.status(200).json(value);
                } else {
                    res.status(400).json(value);
                }
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    })
}