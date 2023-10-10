require('dotenv/config')

const ormconfig = {
  type: 'postgres',
  // entities: [require.resolve('../lib/model')],
  entities: [],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: false,
  migrationsRun: false,
  dropSchema: false,
  logging: ["query", "error", "schema"],
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || 'squid_ink',
  username: process.env.DB_USER || 'squid_ink',
  password: process.env.DB_PASS || 'P4ssw0rd'
}

require('typeorm').createConnection(ormconfig).then(async con => {
  try {
    await con.runMigrations({transaction: 'all'})
  } finally {
    await con.close().catch(err => null)
  }
}).then(
  () => process.exit(),
  err => {
    console.error(err)
    process.exit(1)
  }
)
