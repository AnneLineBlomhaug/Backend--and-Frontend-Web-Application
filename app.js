const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Define navItems globally as an app setting
app.locals.navItems = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Stats', path: '/stats' },
  { name: 'Speakers', path: '/speakers' },
  { name: 'Register', path: '/register' }
];

// Routes
app.get('/', (req, res) => {
  app.locals.currentPath = req.path;
  res.render('index', { title: 'Home' });
});

app.get('/search', (req, res) => {
  app.locals.currentPath = req.path;
  res.render('search', { title: 'Search' });
});

app.get('/stats', (req, res) => {
  app.locals.currentPath = req.path;
  res.render('stats', { title: 'Stats' });
});

app.get('/speakers', (req, res) => {
  app.locals.currentPath = req.path;
  res.render('speakers', { title: 'Speakers' });
});

app.get('/register', (req, res) => {
  app.locals.currentPath = req.path;
  res.render('register', { title: 'Register' });
});

app.listen(8000, () => console.log('Frontend running on port 8000'));