"use strict";

module.exports = function (app) {
  var Cuenta_contable = app.db.models.Cuenta_contable;
  app.route('/cuenta_contable').get(function (req, res) {
    Cuenta_contable.findAll().then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Cuenta_contable.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors);
    });
  });
  app.route('/cuenta_contable/:id').get(function (req, res) {
    Cuenta_contable.findOne({
      where: {
        id_cuenta_contable: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Cuenta_contable.update(req.body, {
      where: {
        id_cuenta_contable: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Cuenta_contable.destroy({
      where: {
        id_cuenta_contable: req.params.id
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