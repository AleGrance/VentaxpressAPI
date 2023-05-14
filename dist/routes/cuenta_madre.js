"use strict";

module.exports = function (app) {
  var Cuenta_madre = app.db.models.Cuenta_madre;
  app.route('/cuenta_madre').get(function (req, res) {
    Cuenta_madre.findAll().then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Cuenta_madre.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors);
    });
  });
  app.route('/cuenta_madre/:id').get(function (req, res) {
    Cuenta_madre.findOne({
      where: {
        id_cuenta_madre: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Cuenta_madre.update(req.body, {
      where: {
        id_cuenta_madre: req.params.id
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
    Cuenta_madre.destroy({
      where: {
        id_cuenta_madre: req.params.id
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