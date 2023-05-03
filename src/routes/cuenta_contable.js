module.exports = app => {
    const Cuenta_contable = app.db.models.Cuenta_contable;

    app.route('/cuenta_contable')
        .get((req, res) => {
            Cuenta_contable.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

        .post((req, res) => {
            Cuenta_contable.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors));
        });

    app.route('/cuenta_contable/:id')
        .get((req, res) => {
            Cuenta_contable.findOne({
                    where: {
                        id_cuenta_contable: req.params.id
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
            Cuenta_contable.update(req.body, {
                    where: {
                        id_cuenta_contable: req.params.id
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
            Cuenta_contable.destroy({
                    where: {
                        id_cuenta_contable: req.params.id
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