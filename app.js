const http = require('http')
const fs = require('fs');
const querystring = require('querystring');
const request = require('request');
const config = require('config');
const jwt = require('./jwt');
const appInfo = require('./package.json');

const index = fs.readFileSync(`${__dirname}/index.html`)

const apiHost = config.get('api.host');
const port = config.get('server.port');

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
  if((req.url === '/api/users' && ( req.method === 'POST' || req.method === 'PUT' ))
    || req.url.endsWith('good')
    || (req.url.startsWith('/api/articles') && req.method === 'GET')
  ) {
    const url = req.url.replace('/api', '');
    req.pipe(request(`${apiHost}${url}`)).pipe(res);
    return;
  }
  if(req.url.startsWith('/api')) {
    const headers = req.headers;
    const cookies = headers['cookie'];
    const cookiesObj = parseCookies(cookies);
    const token = headers['x-atory-token'] || cookiesObj['atory.token'];
    jwt.jwtVerify(token).then(info => {
      if(!info._id) throw new Error('please login');
      const query = querystring.stringify(info);
      const url = req.url.replace('/api', '');
      req.pipe(request(`${apiHost}${url}?${query}`)).pipe(res);
    }).catch(err => {
      res.end(err.message);
    });
    return;
  }
  // count open times（PV）
  res.end(index);
}).listen(port, () => {
  console.log(`server: ${appInfo.name}, ver: ${appInfo.version}, start at: ${port} `);
})

function parseCookies(cookies) {
  const cookiesObj = {}
  const cookiesArr = cookies.split(';');
  cookiesArr.forEach(item => {
    const itemArr = item.split('=');
    const key = itemArr[0].trim();
    const value = itemArr[1];
    cookiesObj[key] = value;
  })
  return cookiesObj;
}