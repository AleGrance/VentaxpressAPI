module.exports = (sequelize, DataTypes) => {
    const Contribuyente = sequelize.define('Contribuyente', {
        id_contribuyente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        razon_social_contribuyente: {
            type: DataTypes.STRING,
            unique: {
                msg: 'La razon social ingresada ya existe!',
                fields: ['razon_social_cliente_contador']
            },
            allowNull: false
        },
        ruc_contribuyente: {
            type: DataTypes.STRING,
            unique: {
                msg: 'El ruc ingresado ya existe!',
                fields: ['ruc_cliente_contador']
            },
            allowNull: false
        },
        dir_contribuyente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel_contribuyente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_contribuyente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timbrado: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });

    Contribuyente.associate = (models) => {
        Contribuyente.hasMany(models.Plan_de_cuenta);
        Contribuyente.hasMany(models.Cabecera_compra);
        Contribuyente.hasMany(models.Cabecera_venta);

    };

    return Contribuyente;
};