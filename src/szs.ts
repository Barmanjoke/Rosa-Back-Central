import { Database } from "db";
import { UUID } from "primitives";
import { v4 as uuidv4 } from 'uuid';

/**
 * Safe zone
 */
export interface SZS {
    id: UUID;
    expires?: Date;
    user_id: UUID;
    assistant_id: UUID;
}

/**
 * Create a new safe zone
 * @param db database
 * @param user user id
 * @param assistant assistant id
 * @returns safe zone id
 */
export async function createSZS(db: Database, user: UUID, assistant: UUID): Promise<UUID> {
    const uid = uuidv4();
    const now = new Date();
    await db.query(`INSERT INTO safe_zones (id, expires, user_id, assistant_id) VALUES ($1, $2, $3, $4)`, [uid, new Date(now.getFullYear(), now.getMonth(), now.getDay() + 60), user, assistant]);
    return uid;
}

/**
 * Get safe zones for a user
 * @param db database
 * @param user user id
 * @returns safe zones
 */
export async function getSafeZonesForUser(db: Database, user: UUID): Promise<SZS[]> {
    return (await db.query(`select * from safe_zones where user_id = $1`, [user])).rows;
}

/**
 * Safe zone message
 */
export interface SafeMessage {
    id: UUID;
    szs_id: UUID;
    by_id: UUID;
    on: Date;
    content: string;
}

/**
 * Retrieve all the messages in the safe zone
 * @param db database
 * @param szs safe zone id
 * @returns safe zone messages
 */
export async function getSafeMessages(db: Database, szs: UUID): Promise<SafeMessage[]> {
    return (await db.query(`select * from safe_zones_messages where szs_id = $1 order by on asc`, [szs])).rows;
}

/**
 * Retrieve a messages from the safe zone
 * @param db database
 * @param szs safe zone id
 * @param id message id
 * @returns safe zone messages
 */
export async function getSafeMessage(db: Database, szs: UUID, id: UUID): Promise<SafeMessage> {
    return (await db.query(`select * from safe_zones_messages where id = $1 and szs_id = $2`, [id, szs])).rows[0];
}

/**
 * Post a new safe message
 * @param db database
 * @param szs safe zone id
 * @param by poster user id
 * @param content message content
 * @returns message id
 */
export async function postSafeMessage(db: Database, szs: UUID, by: UUID, content: string): Promise<UUID> {
    const uid = uuidv4();
    const now = new Date();
    await db.query(`INSERT INTO safe_zones_messages (id, szs_id, by_id, on, content) VALUES ($1, $2, $3, $4, $5)`, [uid, szs, by, now, content]);
    return uid;
}
