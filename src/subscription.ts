import { Database } from "db";
import { UUID } from "primitives";

/**
 * User's subscription to one 
 */
export interface Subscription {
    user_id: UUID;
    assoc_id: UUID;
}

/**
 * Add a user subscription
 * @param db database
 * @param user user id
 * @param assoc association
 */
 export async function addSubscription(db: Database, user: UUID, assoc: UUID){
    await db.query("INSERT INTO subscriptions (user_id, assoc_id) VALUES ($1, $2)", [user, assoc]);
}

/**
 * Remove a user subscription
 * @param db database
 * @param user user id
 * @param assoc association
 */
export async function removeSubscription(db: Database, user: UUID, assoc: UUID){
    await db.query("DELETE FROM subscriptions where user_id = $1 and assoc_id = $2", [user, assoc]);
}
