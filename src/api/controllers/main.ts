import { Body, Controller, Get, Post, Delete, Query, Route, Security, Request, Tags } from '@tsoa/runtime';
import { Database } from 'db';
import * as express from 'express';
import { UUID } from 'primitives';
import { addSubscription, removeSubscription } from 'subscription';
import { createSZS, getSafeMessage, getSafeMessages, postSafeMessage, SafeMessage } from 'szs';
import { createUser, deleteUser, getUser, User, UserCreate } from 'user';

@Tags('👤 User')
@Route('/user')
export class UserController extends Controller {

	@Get('{userId}')
	public async getUser(userId: UUID, @Request() rq: express.Request): Promise<User> {
		return await getUser(rq.db, userId);
	}

    @Delete('{userId}')
    public async deleteUser(userId: UUID, @Request() rq: express.Request): Promise<void> {
        return await deleteUser(rq.db, userId);
    }
	
	@Post('register')
	public async registerUser(@Body() params: UserCreate, @Request() rq: express.Request): Promise<UUID> {
		return await createUser(rq.db, params);
	}

}

@Tags('🔜 Subscriptions')
@Route('/subscription')
export class SubscriptionsController extends Controller {

	@Post('{userId}/{assocId}')
	public async addSubscription(userId: UUID, assocId: UUID, @Request() rq: express.Request): Promise<void> {
		return await addSubscription(rq.db, userId, assocId);
	}

	@Delete('{userId}/{assocId}')
	public async removeSubscription(userId: UUID, assocId: UUID, @Request() rq: express.Request): Promise<void> {
		return await removeSubscription(rq.db, userId, assocId);
	}

}

@Tags('👁 Safe Zones')
@Route('/szs')
export class SZSController extends Controller {

	@Post('{userId}/{assistantId}')
    public async createSafeZone(userId: UUID, assistantId: UUID, @Request() rq: express.Request): Promise<UUID> {
        return await createSZS(rq.db, userId, assistantId);
    }

    @Get('{szsId}/messages/{messageId}')
    public async getSafeZoneMessage(szsId: UUID, messageId: UUID, @Request() rq: express.Request): Promise<SafeMessage> {
        return await getSafeMessage(rq.db, szsId, messageId);
    }

    @Get('{szsId}/messages')
    public async getSafeZoneMessages(szsId: UUID, @Request() rq: express.Request): Promise<SafeMessage[]> {
        return await getSafeMessages(rq.db, szsId);
    }

    @Post('{szsId}/messages/{userId}')
    public async postSafeMessage(szsId: UUID, userId: UUID, @Body() params: { content: string }, @Request() rq: express.Request): Promise<UUID> {
        return await postSafeMessage(rq.db, szsId, userId, params.content);
    }

}
