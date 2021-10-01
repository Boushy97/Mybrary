const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  description:{
    type: String
  },
  publishDate:{
    type: Date,
    required:true
  },
  pageCount:{
    type: Number,
    required:true
  },
  createdAt:{
    type: Date,
    required:true,
    default:Date.now()
  },
  coverImage:{
    type: Buffer,
    required:true
  },
  coverImageType:{
    type:String,
    required:true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Author'
  }
})


/* we used a function here instead of an arrow function
because we want access to the 'this' property
which is going to be linked to the actual book itself */
bookSchema.virtual('coverImagePath').get(function() {
  if(this.coverImage != null && this.coverImageType != null){
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Book', bookSchema)