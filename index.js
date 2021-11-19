const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.get("/api/blogs", (req, res, next) => {
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
        console.log(i)
        blogCard["id"] = i;
        data.push(JSON.parse(JSON.stringify(blogCard)));
    }
    res.json(data);
});

app.listen(3300, () => {
    console.log("Server running on port 3300");
});