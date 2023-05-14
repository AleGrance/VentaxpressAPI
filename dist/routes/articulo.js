"use strict";

module.exports = function (app) {
  var Articulo = app.db.models.Articulo;
  app.route('/articulo').get(function (req, res) {
    Articulo.findAll({
      order: [['nombre_articulo', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Articulo.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  });
  app.route('/articulo/:id').get(function (req, res) {
    Articulo.findOne({
      where: {
        id_articulo: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Articulo.update(req.body, {
      where: {
        id_articulo: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Articulo.destroy({
      where: {
        id_articulo: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
};