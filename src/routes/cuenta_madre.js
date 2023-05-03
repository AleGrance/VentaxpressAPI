module.exports = app => {
    const Cuenta_madre = app.db.models.Cuenta_madre;

    app.route('/cuenta_madre')
        .get((req, res) => {
            Cuenta_madre.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

        .post((req, res) => {
            Cuenta_madre.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors));
        });

    app.route('/cuenta_madre/:id')
        .get((req, res) => {
            Cuenta_madre.findOne({
                    where: {
                        id_cuenta_madre: req.params.id
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
            Cuenta_madre.update(req.body, {
                    where: {
                        id_cuenta_madre: req.params.id
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
            Cuenta_madre.destroy({
                    where: {
                        id_cuenta_madre: req.params.id
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