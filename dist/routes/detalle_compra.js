"use strict";

module.exports = function (app) {
  var Detalle_compra = app.db.models.Detalle_compra;
  app.route('/detalle_compra').get(function (req, res) {
    Detalle_compra.findAll({
      order: [['id_detalle_compra', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Detalle_compra.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  });
  app.route('/detalle_compra/:id').get(function (req, res) {
    Detalle_compra.findOne({
      where: {
        id_detalle_compra: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Detalle_compra.update(req.body, {
      where: {
        id_detalle_compra: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Detalle_compra.destroy({
      where: {
        id_detalle_compra: req.params.id
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