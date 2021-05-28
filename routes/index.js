const express = require('express')

const router = express.Router()
const{  ensureAuthenticated } = require('../config/auth')
const Post = require("../models/post");



router.get('/', ensureAuthenticated, async (req,res)=>{


	const allPosts = await Post.find().limit(2).sort({$natural:-1})
	res.render('welcome' , { allPosts : allPosts , name: req.user.name })
	
})

router.get('/dashboard',ensureAuthenticated ,(req,res)=>{
	res.render('dashboard', {name: req.user.name})
})




router.get('/member', (req,res)=>{
	res.render('member')
})

router.get('/club' , ensureAuthenticated, async (req,res)=>{
	const allPosts = await Post.find()
	res.render('club', { allPosts : allPosts , name: req.user.name })
})



router.post('/member', (req, res) => {
      if(req.body.secret !== "0729008808") {
        req.flash('error_msg', 'wrong passkey')
        res.redirect('member')
       
      }else{
      	req.flash('success_msg', 'your now a member now a member')
      	res.redirect('/club')
      }
  })

module.exports = router