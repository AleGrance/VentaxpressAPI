module.exports = app => {
    const Detalle_compra = app.db.models.Detalle_compra;

    app.route('/detalle_compra')
        .get((req, res) => {
            Detalle_compra.findAll({
                order: [
                    ['id_detalle_compra', 'ASC']
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
            Detalle_compra.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/detalle_compra/:id')
        .get((req, res) => {
            Detalle_compra.findOne({
                    where: {
                        id_detalle_compra: req.params.id
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
            Detalle_compra.update(req.body, {
                    where: {
                        id_detalle_compra: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Detalle_compra.destroy({
                    where: {
                        id_detalle_compra: req.params.id
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