import { UUID } from "primitives";

/**
 * User's subscription to one 
 */
export interface Subscription {
    user_id: UUID;
    assoc_id: UUID;
}
