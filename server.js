const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mobile View</title>
            <style>
                body { margin: 0; padding: 0; overflow: hidden; }
                iframe { width: 100vw; height: 100vh; border: none; }
            </style>
        </head>
        <body>
            <iframe src="/proxy" allow="fullscreen"></iframe>
        </body>
        </html>
    `);
});

app.get('/proxy', async (req, res) => {
    try {
        const response = await axios.get(
            'https://new.playreal.city?openExternalBrowser=1&serialNumber=WXVZKYMDGLCD',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                },
                responseType: 'stream'
            }
        );

        Object.entries(response.headers).forEach(([key, value]) => {
            res.setHeader(key, value);
        });

        response.data.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Proxy error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});