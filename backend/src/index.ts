import express = require("express");
import sqlite3 = require("sqlite3"); // https://github.com/mapbox/node-sqlite3/wiki
import fs = require("fs");

const PORT = 3000;
const app = express();
const dbFilename = "iglubook.sqlite3";
let isNewDb = true;
try {
    fs.statSync(dbFilename);
    isNewDb = false;
}
catch (e) {
}
const db = new sqlite3.Database(dbFilename);

if (isNewDb) {
    try {
        db.serialize(() => {
            db.run("create table if not exists post (\n"+
                   "    id integer primary key,\n"+
                   "    title text,\n"+
                   "    content text\n"+
                   ")");
            var stmt = db.prepare("insert into post (title,content) values (?,?)");
            stmt.run("First post","Content of the first post");
            stmt.run("Second post","Content of the second post");
            stmt.run("Third post","Content of the third post");
            stmt.run("Fourth post","Content of the fourth post");
            stmt.finalize();
        });
    }
    catch (e) {
        console.log("Could not initialize databae: "+e);
        process.exit(1);
    }
}

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
    // db.serialize(() => {
        db.all("select id, title, content from post order by id",function(err,rows) {
            if (err) {
                res.status(500).send("Database error: "+err);
                console.log("Error: "+err);
            }
            else {
                console.log("got it");
                console.log(JSON.stringify(rows));
                // console.log(rows);
                res.send(rows);
            }
        });
    // });
    // res.send([
    //     {
    //         "id": 1,
    //         "title": "First post",
    //         "content": "This is the content of the first post"
    //     },
    //     {
    //         "id": 2,
    //         "title": "Second post",
    //         "content": "This is the content of the second post"
    //     },
    //     {
    //         "id": 3,
    //         "title": "Third post",
    //         "content": "This is the content of the third post"
    //     }
    // ]);
});

app.listen(PORT,() => {
    console.log("Listening on port "+PORT);
});
