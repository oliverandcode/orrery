/**
 * database-connection.ts
 *
 * Creates and exports a single PostgreSQL connection pool shared across
 * the entire application. Using a pool (rather than individual connections)
 * is standard practice: it maintains a set of reusable connections,
 * which is faster and more efficient than opening a new connection for
 * every database query.
 *
 * Configuration is read entirely from environment variables so that
 * credentials never appear in source code. See .env.example for the
 * full list of variables this module expects.
 */

import pg from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables from the .env file into process.env.
// This must happen before we read any process.env values below.
dotenv.config();

const { Pool } = pg;

/**
 * Builds a pg connection configuration object from environment variables.
 *
 * If DATABASE_URL is set (common with cloud providers like Supabase,
 * Railway, or Neon), it takes precedence over the individual host/port/etc.
 * variables. Otherwise, the individual variables are used.
 *
 * pg.PoolConfig is the TypeScript type that describes all valid options
 * for a PostgreSQL connection pool, imported from the @types/pg package.
 */
function buildConnectionConfig(): pg.PoolConfig {
  // Cloud providers typically supply a single connection string.
  // Individual variables are more convenient for local development.
  const connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    return {
      connectionString,
      // SSL is required by most cloud PostgreSQL providers.
      // rejectUnauthorized: false trusts self-signed certificates,
      // which some providers use. Adjust this per your provider's docs.
      ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    };
  }

  // Validate that the individual connection variables are present
  // when DATABASE_URL is not provided.
  const requiredEnvironmentVariables = [
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_DATABASE',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
  ];

  const missingVariables = requiredEnvironmentVariables.filter(
    (variableName) => !process.env[variableName]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(', ')}. ` +
      `Copy .env.example to .env and fill in your database credentials.`
    );
  }

  return {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };
}

/**
 * The shared connection pool used throughout the application.
 *
 * Import this in any module that needs to run database queries:
 *   import { databasePool } from '../config/database-connection.js';
 *   const result = await databasePool.query('SELECT NOW()');
 */
export const databasePool = new Pool(buildConnectionConfig());

/**
 * Verifies that the database connection is working by running a trivial
 * query. Call this during application startup to catch misconfigured
 * credentials early, before any real work begins.
 *
 * Throws if the connection cannot be established.
 */
export async function verifyDatabaseConnection(): Promise<void> {
  // pool.query() borrows a connection from the pool, runs the query,
  // then returns the connection. The result is discarded here — we only
  // care whether an error is thrown.
  await databasePool.query('SELECT 1');
}
