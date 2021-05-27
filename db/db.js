const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://ian_test:<password>@ian.qfm7u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true  }
)
 .then(console.log('connected succesfully'))
 .catch(err=> console.log(err))