const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')

require('./db/db')



//EJS
app.use(expressLayouts)
app.set('view engine' , 'ejs')
//bodyparser
app.use(express.urlencoded({ extended: false }))
//Routes
app.use('/', indexRoute)
app.use('/users', usersRoute)





const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`listenign on ${port}`))