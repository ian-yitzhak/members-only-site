const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://ian_test:<>@ian.qfm7u.mongodb.net/dbname?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true  }
)
 .then(console.log('connected succesfully'))
 .catch(err=> console.log(err))