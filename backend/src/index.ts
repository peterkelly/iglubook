import express = require("express");

const PORT = 3000;
const app = express();

app.use((req,res,next) => {
    console.log(req.method+" "+req.originalUrl);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Headers","Authorization, CentreId, Content-Type");
    next();
});

app.get("/",(req,res) => {
    res.send({ "message": "Hello World" });
});

app.get("/posts",(req,res) => {
    res.send([
        {
            "id": 1,
            "title": "First post",
            "content": "This is the content of the first post"
        },
        {
            "id": 2,
            "title": "Second post",
            "content": "This is the content of the second post"
        },
        {
            "id": 3,
            "title": "Third post",
            "content": "This is the content of the third post"
        }
    ]);
});

app.listen(PORT,() => {
    console.log("Listening on port "+PORT);
});
