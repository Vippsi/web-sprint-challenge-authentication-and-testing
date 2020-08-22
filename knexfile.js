const dotenv = require("dotenv").config()

const postgressConnection = process.env.DATABASE_URL || 'postgresql://postgres@localhost'

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: "localhost",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: "LuLu123!",
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL,
      port: process.env.DATABASE_PORT ||5432 ,
      database: process.env.DATABASE || 'dep7jqpb9umroo',
      user: process.env.DATABASE_USER || 'zeywvxlcdeslkz',
      password: process.env.DATABASE_PASSWORD || '72341fe5580ec988eb48064c11fdf8d225e9a244708b28e67bef5c8dccc6c199',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: 'sqlite3',
    connection: { filename: './database/test.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
