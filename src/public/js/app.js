const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nicknameForm = document.querySelector("#nickname");
const DN = window.location.host;
const socket = new WebSocket(`ws://${DN}`); //서버로의 연결

function makeMessage(type, payload){
    const msg = {type, payload}; // 변수 이름이 key, 담긴 값이 value로 객체 생성
    return JSON.stringify(msg);
}

socket.addEventListener("open", ()=>{
    console.log("connectied to Server ✅");
});

socket.addEventListener("message",(message)=>{
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", ()=>{
    console.log("Disconnected from Server ❌");
});

// setTimeout(()=>{
//     socket.send("hello here is the browser!");
// },10000);

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("msg", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit",handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit);
