module.exports = app => {
    const Detalle_venta = app.db.models.Detalle_venta;

    app.route('/detalle_venta')
        .get((req, res) => {
            Detalle_venta.findAll({
                order: [
                    ['id_detalle_venta', 'ASC']
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
            Detalle_venta.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/detalle_venta/:id')
        .get((req, res) => {
            Detalle_venta.findOne({
                    where: {
                        id_detalle_venta: req.params.id
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
            Detalle_venta.update(req.body, {
                    where: {
                        id_detalle_venta: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Detalle_venta.destroy({
                    where: {
                        id_detalle_venta: req.params.id
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