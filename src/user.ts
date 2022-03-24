import { Database } from "db";
import { UUID } from "primitives";
import { v4 as uuidv4 } from 'uuid';

/**
 * User
 */
export interface User {
    id: UUID;
    created_on: Date;
    delete_on?: Date;
    //TODO profile
}

/**
 * User creation data
 */
export interface UserCreate {
    name: string;
    temporary?: boolean;
}

export async function getUser(db: Database, id: UUID): Promise<User> {
    return (await db.query(`select * from users where id = $1`, [id])).rows[0];
}

export async function deleteUser(db: Database, id: UUID): Promise<void> {
    await db.query(`delete * from users where id = $1`, [id]);
}

export async function createUser(db: Database, crea: UserCreate): Promise<UUID> {
    const uid = uuidv4();
    const now = new Date();
    await db.query(`INSERT INTO users (id, created_on, delete_on, name) VALUES ($1, $2, $3, $4)`, [uid, now, crea.temporary ? new Date(now.getFullYear(), now.getMonth(), now.getDay() + 60) : null, crea.name]);
    return uid;
}

/**
 * User story
 */
export interface Story {
    id: UUID;
    user_id: UUID;
    published_on: Date;
    //TODO content
}
