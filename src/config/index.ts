export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret: process.env.JWT_SECRET || 'somethinginsecure',
  rooms_cap: parseInt(process.env.ROOMS_CAP, 2) || 2,
  database: {
    database_url: process.env.DATABASE_URL,
  },
});
