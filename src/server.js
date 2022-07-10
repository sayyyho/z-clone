import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res)=> {
    res.render("home");
})
app.get("/*", (_,res)=>{
    res.redirect("/");
})

const server = http.createServer(app); 
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket)=>{
    socket.send("hello!!!");
    socket.on("message",(message)=>{
        console.log(message.toString());
    });
    socket.on("close", ()=>{
        console.log("Disconnected from Browser ❌");
    });
    console.log("connected to Browser ✅");
});

server.listen(3000, ()=> console.log("Listening on http://localhost:3000"));
// http and ws protocol share same port