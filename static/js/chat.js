async function enviarMensaje() {

    const mensajeInput = document.getElementById("mensaje");
    const chatBox = document.getElementById("chat");

    const mensaje = mensajeInput.value;

    if (!mensaje) return;

    chatBox.innerHTML += `
        <div class="usuario">
            <strong>Tú:</strong> ${mensaje}
        </div>
    `;

    chatBox.innerHTML += `
        <div class="ia">
            <strong>Labora360:</strong> está resolviendo tu consulta...
        </div>
    `;

    mensajeInput.value = "";

    const respuesta = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mensaje: mensaje
        })
    });

    const data = await respuesta.json();

    chatBox.innerHTML += `
        <div class="ia">
            <strong>Labora360:</strong> ${data.respuesta}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}
