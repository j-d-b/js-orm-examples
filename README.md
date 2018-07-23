# JavaScript ORM Simple Examples
I couldn't decide on an ORM/query builder until I gave a couple top contenders, [knex](https://github.com/tgriesser/knex)/[bookshelf](https://github.com/bookshelf/bookshelf) and [sequelize](https://github.com/sequelize/sequelize) a test drive. Here are two samples that:
* create a `users` table
* add a user
* query for that user
* print the response database user object

## Usage
Install MariaDB with homebrew (macOS)
```
brew install mariadb
```

Start MariaDB server
```
mysql.server start
```

Log in as root
```
mysql -u root
```

Create the test databases
```
CREATE DATABASE test_db;
CREATE DATABASE test_db_2;
```

Log out
```
exit
```

Install dependencies
```
yarn install
```

Run sequelize example
```
yarn sequelize
```

Run knex/bookshelf example
```
yarn knex
```
