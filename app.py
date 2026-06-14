from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    mensaje = request.json["mensaje"]

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": mensaje
                    }
                ]
            }
        ]
    }

    respuesta = requests.post(url, json=payload)

    data = respuesta.json()

    texto = data["candidates"][0]["content"]["parts"][0]["text"]

    return jsonify({
        "respuesta": texto
    })

if __name__ == "__main__":
    app.run(debug=True)
