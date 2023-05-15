const {
    Op
} = require("sequelize");
module.exports = app => {
    const Cabecera_venta = app.db.models.Cabecera_venta;
    const Cliente = app.db.models.Cliente;
    const Users = app.db.models.Users;
    const Caja = app.db.models.Caja;

    app.route('/cabecera_venta')
        .get((req, res) => {
            Cabecera_venta.findAll({
                    order: [
                        ['fecha_factura_venta', 'ASC']
                    ],
                    include: [{
                            model: Cliente,
                            attributes: ['razon_social_cliente', 'ruc_cliente']
                        },
                        {
                            model: Users,
                            attributes: ['user_fullname']
                        },
                        {
                            model: Caja,
                            attributes: ['id_caja']
                        }
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
            Cabecera_venta.create(req.body)
                .then(result => res.json({
                    msg: 'success',
                    body: result
                }))
                .catch(error => res.json({
                    msg: 'error',
                    body: error
                }));
        });

    app.route('/cabecera_ventaByCaja/:id_caja')
        .get((req, res) => {
            Cabecera_venta.findAll({
                    where: {
                        id_caja: req.params.id_caja
                    },
                    order: [
                        ['fecha_factura_venta', 'ASC']
                    ],
                    include: [{
                            model: Cliente,
                            attributes: ['razon_social_cliente', 'ruc_cliente']
                        },
                        {
                            model: Users,
                            attributes: ['user_fullname']
                        },
                        {
                            model: Caja,
                            attributes: ['id_caja']
                        }
                    ]
                })
                .then(result => res.json(result))
                .catch(error => res.json({
                    status: 'error',
                    body: error
                }))
        })

    /**
     *  CONF ANTERIOR
     */


    app.route('/cabecera_venta_total')
        .get((req, res) => {
            Cabecera_venta.count()
                .then(result => res.json({
                    total: result
                }))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                });
        })

    app.route('/cabecera_venta/:id')
        .get((req, res) => {
            Cabecera_venta.findOne({
                    where: {
                        id_cabecera_venta: req.params.id
                    },
                    include: {
                        all: true
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
            Cabecera_venta.update(req.body, {
                    where: {
                        id_cabecera_venta: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.json(error.errors[0].message));
        })
        .delete((req, res) => {
            console.log(req.params);
            Cabecera_venta.destroy({
                    where: {
                        id_cabecera_venta: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({
                        msg: error.message
                    });
                })
        })

    app.route('/cabecera_venta/contribuyente/:id')
        .get((req, res) => {
            Cabecera_venta.findAll({
                    where: {
                        ContribuyenteIdContribuyente: req.params.id
                    },
                    include: {
                        all: true
                    }
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(404).json({
                        msg: error.message
                    });
                })
        })
        // Filtro en reporte
        .post((req, res) => {
            //console.log(req.body);
            if (req.body.id_cliente.length === 0) {
                Cabecera_venta.findAll({
                        where: {
                            ContribuyenteIdContribuyente: req.params.id,
                            condicion_venta_venta: req.body.condicion,
                            fecha_factura_venta: {
                                [Op.between]: [req.body.fecha_inicio, req.body.fecha_fin]
                            }
                        },
                        include: {
                            all: true
                        }
                    })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(404).json({
                            msg: error.message
                        })
                    })
            } else {
                Cabecera_venta.findAll({
                        where: {
                            ContribuyenteIdContribuyente: req.params.id,
                            ClienteIdCliente: req.body.id_cliente,
                            condicion_venta_venta: req.body.condicion,
                            fecha_factura_venta: {
                                [Op.between]: [req.body.fecha_inicio, req.body.fecha_fin]
                            }
                        },
                        include: {
                            all: true
                        }
                    })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(404).json({
                            msg: error.message
                        })
                    })
            }
        })
};