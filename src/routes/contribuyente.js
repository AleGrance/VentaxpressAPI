module.exports = app => {
    const Contribuyente = app.db.models.Contribuyente;

    app.route('/contribuyente')
        .get((req, res) => {
            Contribuyente.findAll({
                    order: [
                        ['razon_social_contribuyente', 'ASC']
                    ],
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

        .post((req, res) => {
            Contribuyente.create(req.body)
                .then(result => res.json(result))
                //.catch(error => res.json(error.errors));
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/contribuyente/:id')
        .get((req, res) => {
            Contribuyente.findOne({
                    where: {
                        id_contribuyente: req.params.id
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
            Contribuyente.update(req.body, {
                    where: {
                        id_contribuyente: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Contribuyente.destroy({
                    where: {
                        id_contribuyente: req.params.id
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