"use strict";

module.exports = function (app) {
  var Contribuyente = app.db.models.Contribuyente;
  app.route('/contribuyente').get(function (req, res) {
    Contribuyente.findAll({
      order: [['razon_social_contribuyente', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Contribuyente.create(req.body).then(function (result) {
      return res.json(result);
    }) //.catch(error => res.json(error.errors));
    ["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  });
  app.route('/contribuyente/:id').get(function (req, res) {
    Contribuyente.findOne({
      where: {
        id_contribuyente: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Contribuyente.update(req.body, {
      where: {
        id_contribuyente: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Contribuyente.destroy({
      where: {
        id_contribuyente: req.params.id
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