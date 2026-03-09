import pg from "pg";

const isProduction = process.env.NODE_ENV === "production";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export default db;
