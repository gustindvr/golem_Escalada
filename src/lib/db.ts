import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'];
    const missing = requiredEnvVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    }

    pool = new Pool({
      host: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT!),
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
      database: process.env.DB_NAME!,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      pool = null;
    });
  }

  return pool;
}

export { getPool as pool };