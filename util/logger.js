const expressPinoLogger = require('express-pino-logger');
const pino = require("./pino").pino;

exports.MiddlewareLogger = expressPinoLogger({
	logger: pino,
	autoLogging: true,
	// Define a custom logger level
	customLogLevel: function (res, err) {
		if (res.statusCode >= 400 && res.statusCode < 500) {
			return 'warn'
		} else if (res.statusCode >= 500 || err) {
			return 'error'
		} else if (res.statusCode >= 300 && res.statusCode < 400) {
			return 'silent'
		}
		return 'info'
	}
});
