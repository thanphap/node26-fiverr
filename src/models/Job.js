const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    return sequelize.define(
        "Job",
        {
            jobId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'job_id',
            },
            jobName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'job_Name'
            },
            assess: {
                type: DataTypes.INTEGER,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING(2000),
            },
            shortDesc: {
                type: DataTypes.STRING,
                field:'short_desc'
            },
            jobRate: {
                type: DataTypes.INTEGER,
                field: 'job_rate'
            },
            jobDetailId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'job_detail_id'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id'
            },
        },
        {
            tableName: 'jobs',
            timestamps: false,
        }
    );
};