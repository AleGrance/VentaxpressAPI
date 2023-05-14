"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("sequelize"),
    Op = _require.Op;

module.exports = function (app) {
  var Cabecera_compra = app.db.models.Cabecera_compra;
  app.route('/cabecera_compra').get(function (req, res) {
    Cabecera_compra.findAll({
      order: [['id_cabecera_compra', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    Cabecera_compra.create(req.body).then(function (result) {
      return res.json(result);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  });
  app.route('/cabecera_compra/:id').get(function (req, res) {
    Cabecera_compra.findOne({
      where: {
        id_cabecera_compra: req.params.id
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
    Cabecera_compra.update(req.body, {
      where: {
        id_cabecera_compra: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      return res.json(error.errors[0].message);
    });
  })["delete"](function (req, res) {
    console.log(req.params);
    Cabecera_compra.destroy({
      where: {
        id_cabecera_compra: req.params.id
      }
    }).then(function (result) {
      return res.sendStatus(204);
    })["catch"](function (error) {
      res.status(412).json({
        msg: error.message
      });
    });
  });
  app.route('/cabecera_compra/contribuyente/:id').get(function (req, res) {
    Cabecera_compra.findAll({
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
    if (req.body.id_proveedor.length === 0) {
      Cabecera_compra.findAll({
        where: {
          ContribuyenteIdContribuyente: req.params.id,
          condicion_venta_compra: req.body.condicion,
          fecha_factura_compra: _defineProperty({}, Op.between, [req.body.fecha_inicio, req.body.fecha_fin])
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
      Cabecera_compra.findAll({
        where: {
          ContribuyenteIdContribuyente: req.params.id,
          ProveedorIdProveedor: req.body.id_proveedor,
          condicion_venta_compra: req.body.condicion,
          fecha_factura_compra: _defineProperty({}, Op.between, [req.body.fecha_inicio, req.body.fecha_fin])
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