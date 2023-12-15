const Sequelize = require('sequelize');

module.exports = app => {
    const Articulo = app.db.models.Articulo;
    const Proveedor = app.db.models.Proveedor;
    const Estado = app.db.models.Estado;

    app.route('/articulo')
        .get((req, res) => {
            Articulo.findAll({
                include: [{
                    model: Proveedor,
                    attributes: ['nom_proveedor']
                }, {
                    model: Estado,
                    attributes: ['descripcion_estado']
                } ],
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
                // .then(result => res.json(result))
                // .catch(error => res.json(error.errors[0].message));
                .then(result => res.json({
                    status: 'success',
                    body: result
                }))
                .catch(error => res.json({
                    status: 'error',
                    body: error.errors
                }));
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

    // PAGINATION

    app.route('/articuloFiltered').post((req, res) => {
        //var order = req.body.order[0];
        var search_keyword = req.body.search.value.replace(/[^a-zA-Z 0-9.]+/g, '').split(" ");
      
        return Articulo.count().then(counts => {
          var condition = "";
      
          for (var searchable of search_keyword) {
            if (searchable != "") {
              if (condition != "") {
                condition += " OR ";
              }
              condition += " nombre_articulo ilike '%" + searchable + "%' ";
              condition += " OR nombre_articulo ilike '%" + searchable + "%' ";
            }
          }
      
          var result = {
            data: [],
            recordsTotal: 0,
            recordsFiltered: 0
          };
      
          if (!counts) {
            return res.json(result);
          }
      
          result.recordsTotal = counts;
      
          console.log(condition);
      
          Articulo.findAndCountAll({
            offset: req.body.start,
            limit: req.body.length,
            where: Sequelize.literal(condition),
            include: [{
                model: Proveedor,
                attributes: ['nom_proveedor']
            }, {
                model: Estado,
                attributes: ['descripcion_estado']
            }],
            order: [
                ['nombre_articulo', 'ASC']
              ]
          }).then(response => {
            result.recordsFiltered = response.count;
            result.data = response.rows;
            res.json(result);
          });
        });
      });
      
};