const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express()

require('./config/passport')(passport)

const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')

require('./db/db')



//EJS
app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine' , 'ejs')
//bodyparser
app.use(express.urlencoded({ extended: false }))


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', indexRoute)
app.use('/users', usersRoute)





const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`listenign on ${port}`))