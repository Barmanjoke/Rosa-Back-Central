import { UUID } from "primitives";

/**
 * A registered company (business)
 */
export interface Company {
    id: UUID;
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
