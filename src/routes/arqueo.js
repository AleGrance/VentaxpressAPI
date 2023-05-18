module.exports = app => {
    const Arqueo = app.db.models.Arqueo;
    const Billete = app.db.models.Billete;
    const Users = app.db.models.Users;
    const Caja = app.db.models.Caja;

    app.route('/arqueo')
        .get((req, res) => {
            Arqueo.findAll({
                    include: [{
                            model: Billete,
                            attributes: ['denominacion']
                        },
                        {
                            model: Users,
                            attributes: ['user_fullname']
                        }
                    ],
                    order: [
                        ['fecha', 'ASC']
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
            Arqueo.create(req.body)
                .then(result => res.json({
                    status: 'success',
                    body: result
                }))
                .catch(error => res.json({
                    status: 'error',
                    body: error
                }));
        });

    app.route('/arqueo/:id')
        .get((req, res) => {
            Arqueo.findOne({
                    where: {
                        id_arqueo: req.params.id
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
            Arqueo.update(req.body, {
                    where: {
                        id_arqueo: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Arqueo.destroy({
                    where: {
                        id_arqueo: req.params.id
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