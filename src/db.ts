import type { Settings } from 'settings';
import { Pool } from 'pg';

export type Database = Pool;

declare global {
    namespace Express {
        interface Request {
            db: Database
        }
    }
}

export default ((settings: Settings) => new Pool({
    max: 20,
    ssl: true,
    idleTimeoutMillis: 30000,
    ...{ connectionString: process.env.DB_URL },
    ...settings.db,
}));
