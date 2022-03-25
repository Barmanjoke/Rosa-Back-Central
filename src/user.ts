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
    email: string;
    first_name: string;
    last_name: string;
    utype: 'individual',
    profile_pic: string;
}

/**
 * User creation data
 */
export interface UserCreate {
    email: string;
    first_name: string;
    last_name: string;
    profile_pic: string;
    temporary?: boolean;
}

export async function getUser(db: Database, id: UUID): Promise<User> {
    return (await db.query(`select * from users where id = $1`, [id])).rows[0];
}

export async function deleteUser(db: Database, id: UUID): Promise<void> {
    await db.query(`delete from users where id = $1`, [id]);
}

export async function createUser(db: Database, crea: UserCreate): Promise<UUID> {
    const uid = uuidv4();
    const now = new Date();
    await db.query(`INSERT INTO users (id, created_on, delete_on, email, first_name, last_name, utype, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [uid, now, crea.temporary ? new Date(now.getFullYear(), now.getMonth(), now.getDay() + 60) : null, crea.email, crea.first_name, crea.last_name, 'individual', crea.profile_pic]);
    return uid;
}

export async function logInUser(db: Database, email: string): Promise<User> {
    return (await db.query(`select * from users where email = $1`, [email])).rows[0];
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
