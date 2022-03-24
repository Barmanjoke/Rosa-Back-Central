import { Body, Controller, Get, Post, Query, Route, Security, Request, Tags } from '@tsoa/runtime';
import * as express from 'express';

@Tags('👤 User')
@Route('/user')
export class UserController extends Controller {
	
	@Get('{userId}')
	public async getUser(userId: UUID, @Request() rq: express.Request): Promise<User> {
		//TODO
	}
	
	@Post('register')
	public async registerUser(@Body() params: UserCreate): Promise<User> {
		//TODO
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
