const express = require("express");
const app = express();

// Logging
const logger = require('./util/logger').MiddlewareLogger;
app.use(logger);
const log = logger.logger;

// CORS
const cors = require("cors");

// Read environment variables
require("dotenv").config();

// Argument parser
const argv = require('minimist')(process.argv.slice(2));
const isLocalhost = !!argv && (argv.localhost == 'true');
log.info('Running in localhost mode: ' + isLocalhost);

// Mongodb initialization
const MongoClient = require('mongodb').MongoClient;
const uri = isLocalhost ? `${process.env.MONGODB_LOCAL_CONNECTION_URI}` :
    `${process.env.MONGODB_DOCKER_CONNECTION_URI}`;
log.info('Mongo connection uri: ' + uri)

app.use(express.static('public'));

async function connectToDb() {
    const mongoclient = new MongoClient(uri, {
        useNewUrlParser: true
    });
    await mongoclient.connect();
    mongoclient.close();
}

async function run() {
    try {
        await connectToDb();
    } catch (error) {
        log.error(error)
    } finally {
        log.info('Finished connecting to database');
    }
}

run();

const corsOptions = {
    origin: `http://localhost:${process.env.NODE_DOCKER_PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res, next) => {
    res.json(["Turmeric", "Michael", "Ginger", "Food"]);
});

app.get("/blogs", (req, res, next) => {
    const card = require('./blogs/blog-1').blog;
    const data = [card];
    res.json(data);
});

// set port, listen for requests
const PORT = isLocalhost ? process.env.NODE_LOCAL_PORT :
    process.env.NODE_DOCKER_PORT;
app.listen(PORT, () => {
    log.info(`Server running on port ${process.env.NODE_DOCKER_PORT}`);
});