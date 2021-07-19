const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
  },
  contractId: {
    users: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name : {
        type : String,
        required : true
      }
    }]
  },
  assign : {
    type : Boolean,
    default : false
  },
  problem: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

postsSchema.methods.addContract = function (userId) {
  const postUpdatedContractIndex = this.contractId.users.findIndex(p => {
    return p.userId.toString() === userId.toString()
  });
  const updatedContract = [...this.contractId.users];
  if (postUpdatedContractIndex >= 0) {
    updatedContract.push({
      userId: userId
    });
    this.contractId.users = updatedContract;
    return this.save();
  }
  return true;

}

module.exports = mongoose.model('Post', postsSchema);
