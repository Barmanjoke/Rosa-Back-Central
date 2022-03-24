import { Body, Controller, Get, Post, Delete, Query, Route, Security, Request, Tags } from '@tsoa/runtime';
import { Database } from 'db';
import * as express from 'express';
import { UUID } from 'primitives';
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

@Tags('Subscriptios')
@Route('/subscription')
export class SubscriptiosController extends Controller {

	@Post('{userId}/{assocId}')
	public async addSubscription(userId: UUID, assocId: UUID): Promise<void> {
		//TODO
	}

	@Delete('{userId}/{assocId}')
	public async removeSubscription(userId: UUID, assocId: UUID): Promise<void> {
		//TODO
	}

}
