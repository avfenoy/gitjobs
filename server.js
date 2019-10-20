const restify = require('restify');
const request = require('request');

const port = 3001

function respond(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('cache-control', 'public, max-age=300');
  const options = {url: `https://jobs.github.com/positions.json?${req.getQuery()}`,
                   json: true};
  const r = request(options, function (error, response, body) {
    res.send(body)
  });
  next();
}

const server = restify.createServer();
server.get('/positions.json', respond);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});