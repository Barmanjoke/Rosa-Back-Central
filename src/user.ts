import { Database } from "db";
import { UUID } from "primitives";

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
}

export async function getUser(db: Database, id: UUID): Promise<User> {
    return (await db.query(`select * from users where id = :1`, [id])).rows[0];
}

export async function deleteUser(db: Database, id: UUID): Promise<void> {
    await db.query(`delete * from users where id = :1`, [id]);
}

export async function createUser(db: Database, crea: UserCreate): Promise<UUID> {
    const res = await db.query(`INSERT INTO users ('name') VALUES (:1)`, [crea.name]);
    return res.rows[0].id;
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
