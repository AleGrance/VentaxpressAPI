"use strict";

module.exports = function (app) {
  var Billete = app.db.models.Billete;
  app.route('/billete').get(function (req, res) {
    Billete.findAll({
      order: [['valor', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Billete.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  });
  app.route('/billete/:id').get(function (req, res) {
    Billete.findOne({
      where: {
        id_billete: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Billete.update(req.body, {
      where: {
        id_billete: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Billete.destroy({
      where: {
        id_billete: req.params.id
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