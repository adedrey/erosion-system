const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contractSchema = new Schema({
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post"
  },
  document: {
    type: String,
    required : true
  },
  starting_date: {
    type: Date,
    // required : true
  },
  ending_date: {
    type: Date,
    // required : true
  }
});

module.exports = mongoose.model('Contract', contractSchema);
