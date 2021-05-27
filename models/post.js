const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

	name:{
		type: String,
		required: true
		
	},

	description:{
		type: String
	
	}
})



module.exports = mongoose.model('Post' , postSchema)