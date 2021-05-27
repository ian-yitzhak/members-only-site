const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://ian_test:METH71@sellah@ian.qfm7u.mongodb.net/testuser?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true  }
)
 .then(console.log('connected succesfully'))
 .catch(err=> console.log(err))