const http = require('http')
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/index.html`)

http.createServer((req, res) => {
  if(req.url === '/dist/bundle.js') {
    const bundle = fs.readFileSync(`${__dirname}/dist/bundle.js`)
    res.end(bundle);
    return
  }
  if(req.url === '/dist/bundle.js.map') {
    const map = fs.readFileSync(`${__dirname}/dist/bundle.js.map`)
    res.end(map);
    return
  }
  res.end(index);
}).listen(9999, () => {
  console.log('start')
})