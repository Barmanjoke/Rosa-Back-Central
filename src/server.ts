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
log.info("Rosa Back Central starting up!");
