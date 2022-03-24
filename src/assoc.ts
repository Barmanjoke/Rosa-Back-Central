import { UUID } from "primitives";

/**
 * A registred and approved association (NGO/...)
 */
export interface Association {
    id: UUID;
    name: string;
    //TODO about us, location
}

/**
 * Event
 */
export interface Event {
    id: UUID;
    assoc_id: UUID;
    name: string;
    //TODO
}

/**
 * A MOOC
 */
export interface Course {
    id: UUID;
    assoc_id: UUID;
    //TODO content
}

/**
 * A Post by an association
 */
export interface Post {
    id: UUID;
    assoc_id: UUID;
    //TODO content
}
