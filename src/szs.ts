import { UUID } from "primitives";

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
 * Safe zone message
 */
export interface SafeMessage {
    id: UUID;
    szs_id: UUID;
    by_id: UUID;
    on: Date;
    //TODO content
}
