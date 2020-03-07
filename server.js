const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.get('/', function (req, res) {
  var options = {
    root: __dirname
  };
  var file = 'index.html';
  res.sendFile(file, options);
});
 
app.listen(3000);

function test() {
  var SimplexNoise = require('simplex-noise');
  var simplex = new SimplexNoise();
  console.log(simplex.noise2D(2, 2));
}