const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "JobDetail",
        {
            jobDetailId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'job_detail_id',
            },
            jobDetailName: {
                type: DataTypes.STRING,
                field: 'job_detail_name',
            },
            image: {
                type: DataTypes.STRING,
            },
            jobTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'job_type_id',
            }
        },
        {
            tableName: "job_detail",
            timestamps: false,
        }
    );
};