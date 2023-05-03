module.exports = app => {
    const Articulo = app.db.models.Articulo;

    app.route('/articulo')
        .get((req, res) => {
            Articulo.findAll({
                order: [
                    ['nombre_articulo', 'ASC']
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
            Articulo.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors[0].message));
        });

    app.route('/articulo/:id')
        .get((req, res) => {
            Articulo.findOne({
                    where: {
                        id_articulo: req.params.id
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
            Articulo.update(req.body, {
                    where: {
                        id_articulo: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Articulo.destroy({
                    where: {
                        id_articulo: req.params.id
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