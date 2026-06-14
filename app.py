from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    mensaje = request.json["mensaje"]

    respuesta = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": mensaje,
            "stream": False
        }
    )

    data = respuesta.json()

    return jsonify({
        "respuesta": data["response"]
    })

if __name__ == "__main__":
    app.run(debug=True)
