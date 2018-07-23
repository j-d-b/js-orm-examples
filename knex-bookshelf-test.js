const chalk = require('chalk');

// can (and should) be a configuration string in an environment variable
const dbConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test_db',
    charset: 'utf8'
  }
};

// I don't like these requires not at the top, but that's how they do it in the docs...
const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);

// create the `users` table, add
const runTest = async () => {
  await knex.schema.createTable('users', (table) => {
    table.string('email').unique('email').primary();
    table.string('password').notNullable();
    table.string('name').notNullable();
    table.enu('role', ['CUSTOMER', 'OPERATOR', 'ADMIN']).notNullable().defaultTo('CUSTOMER');
    table.boolean('confirmed').notNullable().defaultTo(false);
    table.timestamps();
  });

  console.log(chalk.yellow('`users` table created'));

  const User = bookshelf.Model.extend({
    tableName: 'users'
  });

  // add and retrieve user with bookshelf
  User.forge({ email: 'william@gmail.com', name: 'William Wood', password: '000000' }).save().then(async () => {
    console.log(chalk.yellow('william added'));
    const william = await User.where('email', 'william@gmail.com').fetch();
    console.log(william);
  });

  // add and retrieve user with straight knex
  knex('users').insert({ email: 'robert@gmail.com', name: 'Robert Frost', password: '123456' }).then(async () => {
    console.log(chalk.yellow('robert added'));
    const robert = await knex('users').where('email', 'robert@gmail.com');
    console.log(robert);
  });
};

// drop the users
(() => knex.schema.dropTableIfExists('users').then(() => console.log('users table dropped')))();

runTest();
