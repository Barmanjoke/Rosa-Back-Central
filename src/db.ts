import type { Settings } from 'settings';
import { Pool } from 'pg';

export default ((settings: Settings) => new Pool({
    max: 20,
    ssl: true,
    idleTimeoutMillis: 30000,
    ...settings.db,
}));
