const DN = window.location.host;
const socket = new WebSocket(`ws://${DN}`); //서버로의 연결


socket.addEventListener("open", ()=>{
    console.log("connectied to Server ✅");
});

socket.addEventListener("message",(message)=>{
    console.log(`New message: `,message.data);
});

socket.addEventListener("close", ()=>{
    console.log("Disconnected from Server ❌");
});

setTimeout(()=>{
    socket.send("hello here is the browser!");
},10000);