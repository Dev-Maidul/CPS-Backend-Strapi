module.exports = ({ env }) => {
  // For Railway PostgreSQL
  if (env('DATABASE_URL')) {
    const parse = require('pg-connection-string').parse;
    const config = parse(env('DATABASE_URL'));
    
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: env.bool('DATABASE_SSL', true),
        },
        debug: false,
      },
    };
  }

  // Fallback to SQLite for local development
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};