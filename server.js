var express = require('express');
var bodyParser = require('body-parser');
var motorControl = require('./controllers/motorControl');

const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Start Robot project',
    welcomeMessage: 'Welcome to my robot project'
  });
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Start Robot project',
    welcomeMessage: 'Welcome to my robot project'
  });
});

app.get('/control', (req, res) => {
  res.render('control.hbs', {
    pageTitle: 'Control Robot page',
    welcomeMessage: 'Welcome to the page were you can stear the robot'
  });
});

app.post('/forward', (req, res) => {
	console.log('forward');		
  motorControl.forward(() => {
    res.send('Going forward');
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/destroy', (req, res) => {
	console.log('destroy');	
  motorControl.destroy(() => {
    res.send('Driving stopped');
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/reverse', (req, res) => {
		console.log('reverse');	
  motorControl.reverse(() => {
    res.send('Going into reverse');
  }, (e) => {
    res.status(400).send(e);
  });
});
// motorControl.forward();
//motorControl.reverse();
//     setTimeout(function() {
//       gpio.destroy(function() {
//         console.log('Closed pins, now exit');
//       });
//     }, 500);

setTimeout(function() {
  motorControl.destroy()
}, 5000);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
