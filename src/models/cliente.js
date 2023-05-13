module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        razon_social_cliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ruc_cliente: {
            type: DataTypes.STRING,
            unique: {
                msg: 'El RUC ingresado ya existe!',
                fields: ['ruc_cliente']
            },
            allowNull: false
        }
    });

    /**
     * 
     *  ASSOCIATIONS
     * 
     */
    Cliente.associate = (models) => {
        // Cabecera_venta
        Cliente.hasMany(models.Cabecera_venta, {
            foreignKey: {
                name: 'id_cliente',
                allowNull: false
            }
        });
    };

    return Cliente;
};