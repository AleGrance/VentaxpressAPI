module.exports = app => {
    const Cuenta_hijo = app.db.models.Cuenta_hijo;

    app.route('/cuenta_hijo')
        .get((req, res) => {
            Cuenta_hijo.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

        .post((req, res) => {
            Cuenta_hijo.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors));
        });

    app.route('/cuenta_hijo/:id')
        .get((req, res) => {
            Cuenta_hijo.findOne({
                    where: {
                        id_cuenta_hijo: req.params.id
                    }
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(404).json({
                        msg: error.message
                    });
                })
        })
        .put((req, res) => {
            Cuenta_hijo.update(req.body, {
                    where: {
                        id_cuenta_hijo: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                })
        })
        .delete((req, res) => {
            console.log(req.params);
            Cuenta_hijo.destroy({
                    where: {
                        id_cuenta_hijo: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                })
        })
};