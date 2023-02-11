const { Sequelize } = require('sequelize');
const configs = require('../config');

const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Sequelize Connected");
    } catch (error) {
        console.log("Sequelize Error", error);
    }
})();

const User = require('./User')(sequelize);
const Job = require('./Job')(sequelize);
const JobDetail = require('./JobDetail')(sequelize);
const JobType = require('./JobType')(sequelize);
const HireJob = require('./HireJob')(sequelize);
const Comments = require('./Comments')(sequelize);

Job.belongsTo(User, { as: 'userCreated', foreignKey: 'userId' });
User.hasMany(Job, { as: 'jobs', foreignKey: 'userId' });

Job.belongsTo(JobDetail, { as: 'jobDetail', foreignKey: 'jobDetailId' });
JobDetail.hasMany(Job, {as:'jobs', foreignKey: 'jobDetailId'});

JobDetail.belongsTo(JobType, {as:'jobType', foreignKey: 'jobTypeId'});
JobType.hasMany(JobDetail, { as: 'jobDetails', foreignKey: 'jobTypeId'});

User.belongsToMany(Job, {
    as: 'hireJob',
    through: HireJob,
    foreignKey: 'userId',
});

Job.belongsToMany(User, {
    as: 'Renter',
    through: HireJob,
    foreignKey: 'jobId',
});

User.belongsToMany(Job, {
    as: 'jobComments',
    through: Comments,
    foreignKey: 'userId',
});

Job.belongsToMany(User, {
    as: 'userComments',
    through: Comments,
    foreignKey: 'jobId',
});

module.exports = {
    sequelize,
    User,
    Job,
    JobDetail,
    JobType,
    Comments,
    HireJob,
}