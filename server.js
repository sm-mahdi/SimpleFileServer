const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const publicDirectory = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  const filePath = path.join(publicDirectory, req.url === '/' ? 'index.html' : req.url);

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.message);
        return;
      }

      res.writeHead(200);
      res.end(data);
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});