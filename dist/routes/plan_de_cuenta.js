"use strict";

module.exports = function (app) {
  var Plan_de_cuenta = app.db.models.Plan_de_cuenta;
  app.route('/plan_de_cuenta').get(function (req, res) {
    Plan_de_cuenta.findAll().then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Plan_de_cuenta.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors);
    });
  });
  app.route('/plan_de_cuenta/:id').get(function (req, res) {
    Plan_de_cuenta.findOne({
      where: {
        id_plan_de_cuentas: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Plan_de_cuenta.update(req.body, {
      where: {
        id_plan_de_cuentas: req.params.id
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
    Plan_de_cuenta.destroy({
      where: {
        id_plan_de_cuentas: req.params.id
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