module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'zauth',
  database: 'zauth',
  synchronize: true,
  logging: false,
  entities: ['src/db/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
}
