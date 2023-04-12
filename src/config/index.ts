export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    database_url: process.env.DATABASE_URL,
  },
});
