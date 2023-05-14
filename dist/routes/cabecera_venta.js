"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("sequelize"),
    Op = _require.Op;

module.exports = function (app) {
  var Cabecera_venta = app.db.models.Cabecera_venta;
  var Cliente = app.db.models.Cliente;
  var Users = app.db.models.Users;
  app.route('/cabecera_venta').get(function (req, res) {
    Cabecera_venta.findAll({
      order: [['id_cabecera_venta', 'ASC']],
      include: [{
        model: Cliente,
        attributes: ['razon_social_cliente', 'ruc_cliente']
      }, {
        model: Users,
        attributes: ['user_fullname']
      }]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Cabecera_venta.create(req.body).then(function (result) {
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
  app.route('/cabecera_venta_total').get(function (req, res) {
    Cabecera_venta.count().then(function (result) {
      return res.json({
        total: result
      });
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
  app.route('/cabecera_venta/:id').get(function (req, res) {
    Cabecera_venta.findOne({
      where: {
        id_cabecera_venta: req.params.id
      },
      include: {
        all: true
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }).put(function (req, res) {
    Cabecera_venta.update(req.body, {
      where: {
        id_cabecera_venta: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Cabecera_venta.destroy({
      where: {
        id_cabecera_venta: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
  app.route('/cabecera_venta/contribuyente/:id').get(function (req, res) {
    Cabecera_venta.findAll({
      where: {
        ContribuyenteIdContribuyente: req.params.id
      },
      include: {
        all: true
      }
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(404).json({
        msg: error.message
      });
    });
  }) // Filtro en reporte
  .post(function (req, res) {
    //console.log(req.body);
    if (req.body.id_cliente.length === 0) {
      Cabecera_venta.findAll({
        where: {
          ContribuyenteIdContribuyente: req.params.id,
          condicion_venta_venta: req.body.condicion,
          fecha_factura_venta: _defineProperty({}, Op.between, [req.body.fecha_inicio, req.body.fecha_fin])
        },
        include: {
          all: true
        }
      }).then(function (result) {
        return res.json(result);
      })["catch"](function (error) {
        res.status(404).json({
          msg: error.message
        });
      });
    } else {
      Cabecera_venta.findAll({
        where: {
          ContribuyenteIdContribuyente: req.params.id,
          ClienteIdCliente: req.body.id_cliente,
          condicion_venta_venta: req.body.condicion,
          fecha_factura_venta: _defineProperty({}, Op.between, [req.body.fecha_inicio, req.body.fecha_fin])
        },
        include: {
          all: true
        }
      }).then(function (result) {
        return res.json(result);
      })["catch"](function (error) {
        res.status(404).json({
          msg: error.message
        });
      });
    }
  });
};