const { DataTypes } = require("sequelize");

const bcrypt = require('bcrypt');
const { AppError } = require("../helpers/error");

module.exports = (sequelize) => {
    return sequelize.define(
        "User",
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "user_id",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'email',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
                    if (!pattern.test(value)) {
                        throw new AppError(400, 'Password must include special characters, uppercase, lowercase, numbers')
                    }
                    const salt = bcrypt.genSaltSync();
                    const hashedPassword = bcrypt.hashSync(value, salt);
                    this.setDataValue('password', hashedPassword);
                }
            },
            phone: {
                type: DataTypes.STRING,
            },
            birthday: {
                type: DataTypes.STRING,

            },
            avatar: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                defaultValue: 'user',
            },
            skill: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            certification: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
            defaultScope: {
                attributes: {
                    exclude: ['password'],
                },
            },
            hooks: {
                afterSave: (record) => {
                    delete record.dataValues.password;
                }
            },
        },
    );
};