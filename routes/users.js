const express = require('express')

const router = express.Router()



router.get('/login', (req,res)=>{
	res.render('login')
})


router.get('/register', (req,res)=>{
	res.render('register')
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
		res.send('pass')
	}
})
module.exports = router