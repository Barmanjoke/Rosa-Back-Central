import { Body, Controller, Get, Post, Delete, Query, Route, Security, Request, Tags } from '@tsoa/runtime';
import { Company, CompanyCreate, createCompany, getCompany } from 'company';
import { Database } from 'db';
import * as express from 'express';
import { UUID } from 'primitives';
import { addSubscription, removeSubscription } from 'subscription';
import { createSZS, getSafeMessage, getSafeMessages, getSafeZonesForUser, postSafeMessage, SafeMessage, SZS } from 'szs';
import { createUser, deleteUser, getUser, logInUser, User, UserCreate } from 'user';

@Tags('👤 User')
@Route('/user')
export class UserController extends Controller {

    /**
     * Get user by id
     * @param userId user id
     * @returns user
     */
	@Get('{userId}')
	public async getUser(userId: UUID, @Request() rq: express.Request): Promise<User> {
		return await getUser(rq.db, userId);
	}

    /**
     * Delete user by id
     * @param userId user id
     */
    @Delete('{userId}')
    public async deleteUser(userId: UUID, @Request() rq: express.Request): Promise<void> {
        return await deleteUser(rq.db, userId);
    }
	
    /**
     * Create a new user
     * @param params initial user settings
     * @returns new user id
     */
	@Post('register')
	public async registerUser(@Body() params: UserCreate, @Request() rq: express.Request): Promise<UUID> {
		return await createUser(rq.db, params);
	}

    /**
     * Loggs into the system
     * @param params credentials
     * @returns user logged in uid
     */
	@Post('login')
	public async logInUser(@Body() params: { email: string, password: string }, @Request() rq: express.Request): Promise<User> {
		return await logInUser(rq.db, params.email);
	}

}

@Tags('🔜 Subscriptions')
@Route('/subscription')
export class SubscriptionsController extends Controller {

    /**
     * Subscribe a user to an association
     * @param userId user id
     * @param assocId association id
     */
	@Post('{userId}/{assocId}')
	public async addSubscription(userId: UUID, assocId: UUID, @Request() rq: express.Request): Promise<void> {
		return await addSubscription(rq.db, userId, assocId);
	}

    /**
     * Unsubscribe a user from an association
     * @param userId user id
     * @param assocId association id
     */
	@Delete('{userId}/{assocId}')
	public async removeSubscription(userId: UUID, assocId: UUID, @Request() rq: express.Request): Promise<void> {
		return await removeSubscription(rq.db, userId, assocId);
	}

}

@Tags('👁 Safe Zones')
@Route('/szs')
export class SZSController extends Controller {

    /**
     * Get safe zones for a user
     * @param userId user id
     * @returns safe zones
     */
	@Get('{userId}')
    public async getSafeZonesForUser(userId: UUID, @Request() rq: express.Request): Promise<SZS[]> {
        return await getSafeZonesForUser(rq.db, userId);
    }

    /**
     * Create a new safe zone
     * @param userId user id
     * @param assistantId assistant id
     * @returns safe zone id
     */
	@Post('{userId}/{assistantId}')
    public async createSafeZone(userId: UUID, assistantId: UUID, @Request() rq: express.Request): Promise<UUID> {
        return await createSZS(rq.db, userId, assistantId);
    }

    /**
     * Retrieve a particular message from a safe zone
     * @param szsId safe zone id
     * @param messageId message id
     * @returns message info
     */
    @Get('{szsId}/messages/{messageId}')
    public async getSafeZoneMessage(szsId: UUID, messageId: UUID, @Request() rq: express.Request): Promise<SafeMessage> {
        return await getSafeMessage(rq.db, szsId, messageId);
    }

    /**
     * Retrieve all messages from a safe zone
     * @param szsId safe zone id
     * @returns messages in the safe zone
     */
    @Get('{szsId}/messages')
    public async getSafeZoneMessages(szsId: UUID, @Request() rq: express.Request): Promise<SafeMessage[]> {
        return await getSafeMessages(rq.db, szsId);
    }

    /**
     * Post a message to a safe zone
     * @param szsId safe zone id
     * @param userId poster user id
     * @param params message contents
     * @returns posted message id
     */
    @Post('{szsId}/messages/{userId}')
    public async postSafeMessage(szsId: UUID, userId: UUID, @Body() params: { content: string }, @Request() rq: express.Request): Promise<UUID> {
        return await postSafeMessage(rq.db, szsId, userId, params.content);
    }

}

@Tags('🏢 Companies')
@Route('/company')
export class CompanyController extends Controller {

    /**
     * Get company by id
     * @param companyId company id
     * @returns company
     */
	@Get('{companyId}')
	public async getCompany(companyId: UUID, @Request() rq: express.Request): Promise<Company> {
		return await getCompany(rq.db, companyId);
	}

    /**
     * Create a new company
     * @param params initial company settings
     * @returns new company id
     */
	@Post('register')
	public async registerCompany(@Body() params: CompanyCreate, @Request() rq: express.Request): Promise<UUID> {
		return await createCompany(rq.db, params);
	}

}
