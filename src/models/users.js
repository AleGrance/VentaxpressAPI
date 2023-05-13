module.exports = (sequelize, DataType) => {

    const Users = sequelize.define('Users', {
        user_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        user_fullname: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        user_password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        user_email: {
            type: DataType.STRING,
            allowNull: false,
            unique: {
                msg: 'El correo ingresado ya existe',
                fields: ['email']
            },
            validate: {
                notEmpty: true
            }
        }
    });

    /**
     * 
     *  ASSOCIATIONS HASMANY
     * 
     */

    Users.associate = (models) => {
        // Cabecera_venta
        Users.hasMany(models.Cabecera_venta, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        });

        // Tasks
        Users.hasMany(models.Tasks, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        });
    };

    /**
     * 
     *  ASSOCIATIONS BELONGSTO
     * 
     */


    Users.associate = (models) => {
        Users.belongsTo(models.Roles, {
            foreignKey: {
                name: 'role_id',
                allowNull: false
            }
        });
    };

    return Users;
};