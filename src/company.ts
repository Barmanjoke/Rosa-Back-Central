import { Database } from "db";
import { UUID } from "primitives";
import { v4 as uuidv4 } from 'uuid';

/**
 * A registered company (business)
 */
export interface Company {
    id: UUID;
    name: string;
}

/**
 * Company creation data
 */
export interface CompanyCreate {
    name: string;
}

export async function getCompany(db: Database, id: UUID): Promise<Company> {
    return (await db.query(`select * from companies where id = $1`, [id])).rows[0];
}

export async function createCompany(db: Database, crea: CompanyCreate): Promise<UUID> {
    const uid = uuidv4();
    const now = new Date();
    await db.query(`INSERT INTO companies (id, name) VALUES ($1, $2)`, [uid, crea.name]);
    return uid;
}

/**
 * A template of courses in a company
 */
export interface CoursesTemplate {
    id: UUID;
    company_id: UUID;
    courses: UUID[];
}

/**
 * A certification session
 */
export interface CertificationSession {
    id: UUID;
    company_id: UUID;
    name: String;
    expiration: Date;
    courses_required: UUID[];
    courses_completed: UUID[];
}
