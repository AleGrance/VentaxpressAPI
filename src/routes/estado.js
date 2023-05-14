module.exports = app => {
    const Estado = app.db.models.Estado;

    app.route('/estado')
        .get((req, res) => {
            Estado.findAll({
                    order: [
                        ['id_estado', 'ASC']
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
            Estado.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/estado/:id')
        .get((req, res) => {
            Estado.findOne({
                    where: {
                        id_estado: req.params.id
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
            Estado.update(req.body, {
                    where: {
                        id_estado: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Estado.destroy({
                    where: {
                        id_estado: req.params.id
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