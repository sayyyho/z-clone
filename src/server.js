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
const sockets = [];

//wss : server 전체를 의미하고, socket : user가 연 브라우저를 의미
wss.on("connection", (socket)=>{
    sockets.push(socket);
    socket["nickname"] = "anonymous";
    socket.on("message",(message)=>{
        const parsed = JSON.parse(message.toString());
        switch(parsed.type){
            case "msg":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${parsed.payload}`));
            case "nickname":
                socket["nickname"] = parsed.payload;
        }
    });
    socket.on("close", ()=>{
        console.log("Disconnected from Browser ❌");
    });
    console.log("connected to Browser ✅");
});

server.listen(3000, ()=> console.log("Listening on http://localhost:3000"));
// http and ws protocol share same port