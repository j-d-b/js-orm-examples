const chalk = require('chalk');
const Sequelize = require('sequelize');

// should come from env variables
const sequelize = new Sequelize({
  database: 'test_db_2',
  username: 'bctc-tas',
  password: null,
  dialect: 'mysql'
});

// the model
const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM,
    values: ['CUSTOMER', 'OPERATOR', 'ADMIN'],
    defaultValue: 'CUSTOMER',
    allowNull: false
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

const runTest = async () => {
  await User.sync({ force: true }); // add users table, this is a bit unclear
  console.log(chalk.yellow('`users` table created'));

  User.create({ name: 'Robert Frost', email: 'robert@gmail.com', password: '123456' }).then(async () => {
    console.log(chalk.yellow('robert created'));
    const robert = await User.findOne({ where: { email: 'robert@gmail.com' } });
    console.log(robert);
  });
};

runTest();
