from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "you@example.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "password")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)

def send_email(to, subject, body):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = SMTP_FROM
    msg["To"] = to

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)

@app.route("/notify", methods=["POST"])
def notify():
    data = request.get_json() or {}
    to = data.get("to")
    subject = data.get("subject", "Notification")
    body = data.get("body", "")

    if not to:
        return jsonify({"error": "Missing 'to'"}), 400

    try:
        send_email(to, subject, body)
        return jsonify({"status": "sent"}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
