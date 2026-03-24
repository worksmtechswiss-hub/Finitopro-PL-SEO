const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const BASE = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  let filePath;

  if (url === '/') {
    filePath = path.join(BASE, 'index.html');
  } else if (url.endsWith('/')) {
    filePath = path.join(BASE, url, 'index.html');
  } else {
    filePath = path.join(BASE, url);
  }

  let ext = path.extname(filePath);
  if (!ext) {
    // Try adding /index.html
    const withIndex = path.join(filePath, 'index.html');
    if (fs.existsSync(withIndex)) {
      filePath = withIndex;
      ext = '.html';
    }
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`FinitoPro PL server running on http://localhost:${PORT}`));
