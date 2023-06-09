var CryptoJS = require("crypto-js");
module.exports = app => {
    const Users = app.db.models.Users;
    const Roles = app.db.models.Roles;

    app.route('/users')
        .get((req, res) => {
            Users.findAll({
                    attributes: {
                        exclude: ['user_password']
                    },
                    include: [{
                        model: Roles,
                        attributes: ['role_name']
                    }]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(402).json({
                        msg: error.menssage
                    });
                });
        })
        .post((req, res) => {
            // Receiving data
            const {
                user_name,
                user_password,
                user_email,
                user_fullname,
                role_id
            } = req.body;
            // Creating new user
            const user = {
                user_name: user_name,
                user_password: user_password,
                user_email: user_email,
                user_fullname: user_fullname,
                role_id: role_id,
            }
            // Encrypting password
            user.user_password = CryptoJS.AES.encrypt(user.user_password, 'secret').toString();
            // Insert new user
            Users.create(user)
                .then(result => res.json({
                    status: 'success',
                    body: result
                }))
                .catch(error => res.json({
                    status: 'error',
                    body: error.errors
                }));
        })

    app.route('/users/:user_id')
        .get((req, res) => {
            Users.findOne({
                    where: req.params
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(404).json({
                        msg: error.message
                    });
                });
        })
        .put((req, res) => {
            console.log(req.body);
            if (req.body.user_password == '') {
                // Receiving data
                const {
                    user_name,
                    user_email,
                    user_fullname,
                    role_id
                } = req.body;
                // Creating new user
                const user = {
                    user_name: user_name,
                    user_email: user_email,
                    user_fullname: user_fullname,
                    role_id: role_id,
                }

                Users.update(user, {
                        where: req.params
                    })
                    .then(result => res.json({
                        status: 'success'
                    }))
                    .catch(error =>
                        res.status(412).json(error.message))
            } else {
                // Receiving data
                const {
                    user_name,
                    user_password,
                    user_email,
                    user_fullname,
                    role_id
                } = req.body;
                // Creating new user
                const user = {
                    user_name: user_name,
                    user_password: user_password,
                    user_email: user_email,
                    user_fullname: user_fullname,
                    role_id: role_id,
                }
                // Encrypting password
                user.user_password = CryptoJS.AES.encrypt(user.user_password, 'secret').toString();
                
                Users.update(user, {
                        where: req.params
                    })
                    .then(result => res.json({
                        status: 'success'
                    }))
                    .catch(error =>
                        res.status(412).json(error.message))
            }
        })
        .delete((req, res) => {
            //const id = req.params.id;
            Users.destroy({
                    where: req.params
                })
                .then(() => res.json(req.params))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                })
        })

    app.route('/usersCaja')
        .get((req, res) => {
            Users.findAll({
                    where: {
                        role_id: 2
                    }
                })
                .then(result => res.json(result))
                .catch(error => res.json({
                    status: 'error',
                    body: error
                }))
        })
};