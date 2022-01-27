const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;

const logger = require('./util/logger').MiddlewareLogger;
app.use(logger);
const log = logger.logger;

const uri = `${process.env.MONGODB_CONNECTION_URI}`;
log.info('connection uri: ' + uri)

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
    const blogCard = {
        "id": 1,
        "image": "",
        "title": "This is my first blog",
        "subtitle": "Finally the website is up",
        "description": "I'm so excited to have my first blog website up. Click the blog to read more info on how I developed it.",
        "tags": ["React", "Beginner"]
    }
    const data = [];
    for (let i = 0; i < 5; i++) {
        blogCard["id"] = i;
        data.push(JSON.parse(JSON.stringify(blogCard)));
    }
    res.json(data);
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 9000;
app.listen(PORT, () => {
    log.info(`Server running on port ${process.env.NODE_DOCKER_PORT}`);
});