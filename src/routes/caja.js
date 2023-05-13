module.exports = app => {
    const Caja = app.db.models.Caja;

    app.route('/caja')
        .get((req, res) => {
            Caja.findAll({
                    order: [
                        ['fecha_apertura', 'ASC']
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
            Caja.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/caja/:id')
        .get((req, res) => {
            Caja.findOne({
                    where: {
                        id_caja: req.params.id
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
            Caja.update(req.body, {
                    where: {
                        id_caja: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Caja.destroy({
                    where: {
                        id_caja: req.params.id
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