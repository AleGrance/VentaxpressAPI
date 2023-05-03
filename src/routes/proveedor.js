module.exports = app => {
    const Proveedor = app.db.models.Proveedor;

    app.route('/proveedor')
        .get((req, res) => {
            Proveedor.findAll({
                order: [
                    ['nom_proveedor', 'ASC']
                ]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

        .post((req, res) => {
            Proveedor.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/proveedor/:id')
        .get((req, res) => {
            Proveedor.findOne({
                    where: {
                        id_proveedor: req.params.id
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
            Proveedor.update(req.body, {
                    where: {
                        id_proveedor: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Proveedor.destroy({
                    where: {
                        id_proveedor: req.params.id
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