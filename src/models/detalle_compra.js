module.exports = (sequelize, DataTypes) => {
    const Detalle_compra = sequelize.define('Detalle_compra', {
        id_detalle_compra: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion_detalle_compra: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cant_item_detalle_compra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subtotal_detalle_compra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_detalle_compra: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Nro que se relaciona con la cabecera
        nro_factura_compra: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Detalle_compra;
};