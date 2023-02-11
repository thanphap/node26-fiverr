const { DataTypes } = require("sequelize")

module.exports = (sequelize) => { 
    return sequelize.define(
        "JobType",
        {
            jobTypeId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "job_type_id",
            },
            jobTypeName:{
                type: DataTypes.STRING,
                allowNull: false,
                field:"job_type_name",
            },
        },
        {
            tableName: "job_type",
            timestamps: false,
        }
    );
 };