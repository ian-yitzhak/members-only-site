const LocalStrategy = require('passport-local').LocalStrategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


//user
const User = require('../models/User')


module.exports = (pasport)=>{

	passport.use(

		new LocalStrategy({ usernameField: 'email'} , (email,password,done)=>{
			//match user
			User.findOne({ email: email})
			.then(user=>{
				if(!user){
					return done(null, false, {message : 'email doenot exist'})

				}
				//password
				bcrypt.compare(password, user.password,()=>{
					if(err) throw err;
					if(isMatch){
						return done(null, user);
					}else{
						return done(null, false,{message: 'incorect p/w'})
					}


				});

				
			})
			.catch(err=> console.log(err))

		})

		);


	passport.serializeUser((user, done)=> {
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });

};

