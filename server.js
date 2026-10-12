// Production server for hosting platforms that boot a Node app after
// `npm run build`: serves the static Neutaware website build.
const express = require('express');
const path = require('path');

const siteDir = path.join(__dirname, 'artifacts/neutaware-site/dist/public');
const app = express();

// Vite fingerprints files in /assets, so they can be cached long-term.
app.use('/assets', express.static(path.join(siteDir, 'assets'), {
  immutable: true,
  maxAge: '1y',
}));
app.use(express.static(siteDir));

// Client-side routes (e.g. /about) all load index.html.
app.get('*', (req, res) => res.sendFile(path.join(siteDir, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Neutaware site listening on port ${port}`));
