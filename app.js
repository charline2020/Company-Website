// server.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { DBHOST, DBPORT, DBNAME, SESSION_SECRET } = require('./config/config');
const indexRouter = require('./routes/web/index');
const indexApiRouter = require('./routes/api/HomePage')
const app = express();

// Connect to MongoDB
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase if necessary
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  // console.error('MongoDB connection error:', err.message);
  res.render('error', { // Render a more generic error page for internal server errors
    message: 'Oops! We are currently experiencing technical difficulties.',
    redirectUrl: '/'
  })
});

// Session configuration
app.use(session({
  name: 'connect.sid',
  secret: SESSION_SECRET || 'default_secret', // Use the session secret from config
  saveUninitialized: false,
  resave: false, // Typically set to false to avoid unnecessary saves
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`,
    mongooseConnection: mongoose.connection // Optional: use existing Mongoose connection
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Website page
app.use('/', indexRouter);
app.use('/api', indexApiRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('error', { // Render a more generic error page for internal server errors
    message: 'Oops! Something went wrong.',
    redirectUrl: '/'
  })
});

// Error handler
app.use((err, req, res, next) => {
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { // Render a more generic error page for internal server errors
    message: 'Oops! We are currently experiencing technical difficulties.',
    redirectUrl: '/'
  })
});

const port = process.env.PORT || 3000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
