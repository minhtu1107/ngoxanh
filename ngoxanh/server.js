const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
// const dev = process.env.REACT_APP_NODE_ENV.trim() !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
 
  server.all('*', (req, res) => {
	// console.log('server.all' + req.url);
    return handle(req, res);
  });

	server.listen(port, function () {
	  console.log('Https listening on *: ' + port);
	});
});