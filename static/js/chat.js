async function enviarMensaje(){

const input=document.getElementById("mensaje");
const texto=input.value.trim();

if(!texto) return;

const chat=document.getElementById("chat-box");

chat.innerHTML+=`
<div class="user-message">${texto}</div>
`;

input.value="";
chat.innerHTML += `
<div class="bot-message" id="typing">
🏢 Labora360 está resolviendo tu consulta...
</div>
`;

chat.scrollTop = chat.scrollHeight;
const respuesta=await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
mensaje:texto
})
});

const data=await respuesta.json();
document.getElementById("typing").remove();
chat.innerHTML+=`
<div class="bot-message">${data.respuesta}</div>
`;

chat.scrollTop=chat.scrollHeight;
}

document.getElementById("mensaje")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){
enviarMensaje();
}

});
