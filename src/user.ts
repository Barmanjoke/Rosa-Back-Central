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

export interface Story {
    id: UUID;
    user_id: UUID;
    published_on: Date;
    //TODO content
}
