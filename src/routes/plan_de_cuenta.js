module.exports = app => {
    const Plan_de_cuenta = app.db.models.Plan_de_cuenta;

    app.route('/plan_de_cuenta')
        .get((req, res) => {
            Plan_de_cuenta.findAll()
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

        .post((req, res) => {
            Plan_de_cuenta.create(req.body)
                .then(result => res.json(result))
                .catch(error => res.json(error.errors));
        });

    app.route('/plan_de_cuenta/:id')
        .get((req, res) => {
            Plan_de_cuenta.findOne({
                    where: {
                        id_plan_de_cuentas: req.params.id
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
            Plan_de_cuenta.update(req.body, {
                    where: {
                        id_plan_de_cuentas: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                })
        })
        .delete((req, res) => {
            console.log(req.params);
            Plan_de_cuenta.destroy({
                    where: {
                        id_plan_de_cuentas: req.params.id
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