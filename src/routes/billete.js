module.exports = app => {
    const Billete = app.db.models.Billete;

    app.route('/billete')
        .get((req, res) => {
            Billete.findAll({
                    order: [
                        ['valor', 'ASC']
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
            Billete.create(req.body)
                .then(result => res.json({
                    status: 'success',
                    body: result
                }))
                .catch(error => res.json({
                    status: 'error',
                    body: error
                }));
        });

    app.route('/billete/:id')
        .get((req, res) => {
            Billete.findOne({
                    where: {
                        id_billete: req.params.id
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
            Billete.update(req.body, {
                    where: {
                        id_billete: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Billete.destroy({
                    where: {
                        id_billete: req.params.id
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