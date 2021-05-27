const express = require('express')

const router = express.Router()
const{  ensureAuthenticated } = require('../config/auth')
const Post = require("../models/post");



router.get('/', async (req,res)=>{


	const allPosts = await Post.find()
	res.render('welcome' , { allPosts : allPosts })
	
})

router.get('/dashboard',ensureAuthenticated ,(req,res)=>{
	res.render('dashboard', {name: req.user.name})
})

module.exports = router