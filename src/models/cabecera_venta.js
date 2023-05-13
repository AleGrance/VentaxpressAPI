module.exports = (sequelize, DataTypes) => {
    //const Cliente = app.db.models.Cliente;
    const Cabecera_venta = sequelize.define('Cabecera_venta', {
        id_cabecera_venta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nro_factura_venta: {
            type: DataTypes.STRING,
            unique: {
                msg: 'El nro de factura ingresado ya existe!',
                fields: ['nro_factura_compra']
            },
            allowNull: false
        },
        condicion_venta_venta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_venta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_factura_venta: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        monto_gravado_10: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iva_10: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        monto_gravado_5: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iva_5: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // id_cliente: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: Cliente,
        //         key: 'id_cliente'
        //     }
        // }
    });

    /**
     * 
     *  ASSOCIATIONS
     * 
     */

    Cabecera_venta.associate = (models) => {
        //BELONGSTO
        // Cliente
        Cabecera_venta.belongsTo(models.Cliente, {
            foreignKey: {
                name: 'id_cliente',
                allowNull: false
            }
        });

        // Caja
        Cabecera_venta.belongsTo(models.Caja, {
            foreignKey: {
                name: 'id_caja',
                allowNull: false
            }
        });

        // Usuario
        Cabecera_venta.belongsTo(models.Users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        });
    };

    return Cabecera_venta;
};