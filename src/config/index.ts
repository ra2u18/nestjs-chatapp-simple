export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret: process.env.JWT_SECRET || 'somethinginsecure',
  database: {
    database_url: process.env.DATABASE_URL,
  },
});
