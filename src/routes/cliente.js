module.exports = app => {
    const Cliente = app.db.models.Cliente;

    app.route('/cliente')
        .get((req, res) => {
            Cliente.findAll({
                order: [
                    ['razon_social_cliente', 'ASC']
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
            Cliente.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/cliente/:id')
        .get((req, res) => {
            Cliente.findOne({
                    where: {
                        id_cliente: req.params.id
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
            Cliente.update(req.body, {
                    where: {
                        id_cliente: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Cliente.destroy({
                    where: {
                        id_cliente: req.params.id
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