"use strict";

module.exports = function (app) {
  var Detalle_venta = app.db.models.Detalle_venta;
  app.route('/detalle_venta').get(function (req, res) {
    Detalle_venta.findAll({
      order: [['id_detalle_venta', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Detalle_venta.create(req.body).then(function (result) {
      return res.json({
        msg: 'success',
        body: result
      });
    })["catch"](function (error) {
      return res.json({
        msg: 'error',
        body: error
      });
    });
  });
  app.route('/detalle_venta/:nro').get(function (req, res) {
    Detalle_venta.findAll({
      where: {
        nro_factura_venta: req.params.nro
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  });
  app.route('/detalle_venta/:id').get(function (req, res) {
    Detalle_venta.findOne({
      where: {
        id_detalle_venta: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Detalle_venta.update(req.body, {
      where: {
        id_detalle_venta: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Detalle_venta.destroy({
      where: {
        id_detalle_venta: req.params.id
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