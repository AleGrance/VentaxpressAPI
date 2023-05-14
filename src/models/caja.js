module.exports = (sequelize, DataTypes) => {
    const Caja = sequelize.define('Caja', {
        id_caja: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_apertura: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_cierre: {
            type: DataTypes.DATE,
            allowNull: true
        },
        total_ventas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_devoluciones: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_efectivo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_tarjeta: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_cheques: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_cupones: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cambio_inicial: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cambio_final: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    /**
     * 
     *  ASSOCIATIONS
     * 
     */

    Caja.associate = (models) => {
        // BELONGSTO
        // User
        Caja.belongsTo(models.Users, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        });
        Caja.belongsTo(models.Estado, {
            foreignKey: {
                name: 'id_estado',
                allowNull: false
            }
        });

        // HASMANY
        // Cabecera_venta
        Caja.hasMany(models.Cabecera_venta, {
            foreignKey: {
                name: 'id_caja',
                allowNull: false
            }
        });
        Caja.hasMany(models.Arqueo, {
            foreignKey: {
                name: 'id_caja',
                allowNull: false
            }
        });

    };

    return Caja;
};