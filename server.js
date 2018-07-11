const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var logMessage = `${now}: ${req.method} ${req.url}`;

  console.log(logMessage);
  fs.appendFile('server.log', logMessage + '\n', (err) => {
    if (err) {
      console.log('Unale to append to server.log');
    };
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Some Website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Invalid page request. Unable to proeed'
  })
});

app.listen(3000, () => {
  console.log('The server is up on port 3000');
});
