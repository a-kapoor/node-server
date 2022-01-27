const pino = require('pino');
exports.pino = pino({
	prettyPrint: {
		colorize: true, // colorizes the log
		levelFirst: true,
		translateTime: 'yyyy-dd-mm, h:MM:ss TT',
	}
});
