const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => { 
    return sequelize.define(
        "Comments",
        {
            commentId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'comment_id',
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
            createdComment: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                field: 'created_comment',
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            commentRate:{
                type: DataTypes.INTEGER,
                field: 'comment_rate',
            },
        },
        {
            tableName: 'comments',
            timestamps: false,
        }
    );
 };
