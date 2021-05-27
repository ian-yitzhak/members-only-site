const express = require('express')

const router = express.Router()

const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport');
const Post = require("../models/post");
const{  ensureAuthenticated } = require('../config/auth');




router.get('/login', (req,res)=>{
	res.render('login')
})


router.get('/register', (req,res)=>{
	res.render('register')
})

router.get('/dashboard', (req,res)=>{
	res.render('dashboard')
})



//register

router.post('/register' , (req,res)=>{

	const { name,email,password,password2} = req.body;

	let errors = []

	//check req fields

	if(!name || !email || !password || !password2){
		errors.push({msg: 'please fill in the fields'})
	}

	//check p/w

	if(password !== password2){

		errors.push({msg: 'password must match'})
	}

	//p/s length

	if(password.length< 6){
		errors.push({msg: 'password too short'})
	}
	if(errors.length > 0){

		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		})

	}else{
		User.findOne({email: email})
		.then(user=>{
			if(user){
				errors.push({msg: 'email exist'} )

			res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});

			}
			else{
				const newUser = new User({
					name,
					email,
					password
				});
				bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newUser.password, salt, (err,hash)=> {
					if(err) throw err
						newUser.password = hash;
					 newUser.save()
					 .then(user=>{
					 	req.flash('success_msg', 'succesfully registered')
					 	res.redirect('/users/login')
					 })
					 .catch(err=> console.log(err))

				}))





			}
		});
	}
})

router.post('/login', (req,res,next)=>{
	passport.authenticate('local',
	{
	successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true

	}) (req,res,next);
})

router.get('/logout', (req,res)=>{

	req.logout()
	req.flash('success_msg', "you logged out")
	res.redirect('/users/login')
})

//post


router.get('/post', ensureAuthenticated, (req,res)=>{
	res.render('post')


})

router.post('/post', async (req,res)=>{

	const newPost = new Post({
		name: req.body.name,
		description: req.body.description
	})
	try{

		savePost = await newPost.save()
		res.redirect('/')
	}
	catch(err){
		console.log(err)
	}

	
})
module.exports = router