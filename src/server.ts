import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
log.setLevel(process.env.LOGLEVEL as log.LogLevelDesc || log.levels.INFO);
prefix.reg(log);
prefix.apply(log, {
	template: "[%t %l %n] ",
	levelFormatter: (level) => level.toUpperCase(),
	nameFormatter: (name) => name ?? "-",
	timestampFormatter: (date) => date.toISOString(),
});
log.info("Rosa Back Central starting up...");

start().catch(err => {
	log.error("Error on server start:\n%s", err);
	process.exitCode = 1;
});

async function start(){
    const settings = (await import('settings')).default();
    if(!settings) throw new Error("Failed to load or find settings! >(");
    const db = (await import('db')).default(settings);
    await db.connect();
    log.info(await db.query("select count (*) from events"));
    log.info("Connected to the database...");

	const express = (await import('express')).default;
	const bodyParser = await import('body-parser');
	const qBoolParser = require('express-query-auto-parse');
	const http = await import('http');
	const RegisterRoutes = (await import('./api/routes/routes')).RegisterRoutes;

	const app = express();
	const qs = (await import('qs')).default;
	app.set('query parser', function(str: string){
		return qs.parse(str, {arrayLimit: 100});
	});
	app.use((req, res, next) => {
		req.db = db;
		next();
	});
	app.use(bodyParser.json());
	app.use(qBoolParser());
	RegisterRoutes(app);

	const port = 3060;

	await new Promise<void>((s, f) => {
		const httpServer = http.createServer(app).listen(port, function(){
			log.info('HTTP server started on port ' + port);
			s();
		});
		httpServer.on("error", f);
	});

    log.info("API Ready to roll!");
}
