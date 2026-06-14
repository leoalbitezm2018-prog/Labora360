async function enviarMensaje() {
    const mensaje = document.getElementById("mensaje").value;

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
}
