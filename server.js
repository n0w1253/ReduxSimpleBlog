const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;  //process.env.PORT is and environment variable given by heroku
const app = express();

app.listen(port, function(){
    console.log('Server started ' + port);
});


app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});




/* to run this app locally, run webpack -p to create bundle.js, then node server.js*/