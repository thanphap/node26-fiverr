const { DataTypes } = require("sequelize")

module.exports = (sequelize) => { 
    return sequelize.define(
        'HireJob',
        {
            hireJobId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'hire_job_id',
            },
            jobId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'job_id',
            },
            userId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
            },
            hireDate:{
                type: DataTypes.DATE,
                allowNull: false,
                field: 'hire_date',
            },
            complete:{
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            tableName: 'hire_job',
            timestamps: false,
        }
    );
 };