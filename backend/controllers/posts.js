const Post = require('../models/posts');
const Contract = require('../models/contracts');

// Add a post by the Admin
exports.postPosts = (req, res, next) => {
  const title = req.body.title;
  const address = req.body.address;
  const body = req.body.body;
  const status = req.body.status;
  const progress = req.body.progress;
  const problem = req.body.problem;

  const post = new Post({
    title: title,
    address: address,
    body: body,
    status: status,
    progress: progress,
    contractId: {
      users: []
    },
    problem: problem,
    userId: req.admin
  })

  post.save()
    .then(post => {
      res.status(200).json({
        message: 'Post shared successfully!',
        post: post
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      })
    })
}

// Fetch all post for the admin
exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({
        message: 'Result sent',
        posts: posts
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

// Fetch one post for the Admin to Edit
exports.getPostById = (req, res, next) => {
  const postId = req.params.id;

  Post.findOne({
      _id: postId
    })
    .then(post => {
      if (!post) {
        return res.status(401).json({
          message: 'Unable to find a post for this particular id'
        })
      }
      res.status(200).json({
        message: 'Post found',
        post: post
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

// Update a post By Admin
exports.postUpdatePost = (req, res, next) => {
  const postId = req.params.id;
  const title = req.body.title;
  const address = req.body.address;
  const body = req.body.body;
  const status = req.body.status;
  const progress = req.body.progress;
  const problem = req.body.problem;
  Post.findOne({
      _id: postId
    })
    .then(post => {
      if (!post) {
        return res.status(401).json({
          message: 'Unable to find a post'
        })
      }
      post.title = title;
      post.address = address;
      post.body = body;
      post.status = status;
      post.progress = progress;
      post.problem = problem;
      return post.save()
        .then(newPost => {
          console.log(newPost);
          res.status(200).json({
            message: 'Post updated',
            post: newPost
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err
          })
        })

    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

// Delete Post by the Admin
exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  Post.findOneAndDelete({
      _id: postId
    })
    .then(result => {
      if (!result) {
        res.status(401).json({
          message: 'Unable to delete'
        })
      }
      res.status(200).json({
        message: 'Deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

// Update Contract Application
exports.postContract = (req, res, next) => {
  const postId = req.body.postId
  const userId = req.user._id;
  const imageUrl = req.protocol + '://' +  req.get('host');
  // console.log(postId, userId);
  // console.log(req.file);
  Contract.findOne({
      'user.userId': userId,
      postId: postId
    })
    .then(contract => {
      if (contract) {
        return res.status(401).json({
          message: 'Application already exist!'
        })
      }
      const newContract = new Contract({
        user : {
          userId : userId,
          name : req.user.name,
          email : req.user.email
        },
        postId: postId,
        document : imageUrl + '/documents/' + req.file.filename
      });
      return newContract.save()
        .then(result => {
          res.status(200).json({
            message : 'Application Successful'
          })
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
}

// Assign a contract to user for Admin
exports.postAssignContract = (req, res, next) => {
  // ...
  const userId = req.body.userId;
  const name = req.body.name;
  Post.findOne({_id : req.params.id })
  .then(post => {
    if(!post){
      return res.status(401).json({
        message : 'Unable to find Post'
      })
    }
    const postUpdatedIndex = post.contractId.users.findIndex(p => {
      return p.userId.toString() === userId.toString()
    })
    console.log(postUpdatedIndex);
    if(postUpdatedIndex >= 0){
      return res.status(401).json({
        message : 'User already assigned for this task'
      })
    }
    post.contractId.users.push({
      userId : userId,
      name : name
    })
    post.assign = true;
    return post.save()
    .then(post => {
      res.status(200).json({
        message : 'Assignation Confirmed',
        post : post
      })
    })
  })
  .catch(err => {
    res.status(500).json({
      message : err
    })
  })
}

//Get Opened Posts for Admin
exports.getAdminApplicationPosts = (req, res, next) => {
  Contract.find({postId : req.params.id})

  .then(applicants => {
    res.status(200).json({
      applicants : applicants
    })
  })
  .catch(err => {
    res.status(500).json({
      message : err
    })
  })
}



//Get Opened Posts for Users
exports.getUserPosts = (req, res, next) => {
  Post.find({
      status: '0'
    })
    .then(posts => {
      res.status(200).json({
        message: 'Post fetched',
        posts: posts
      })
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

// Get one open post for Users
exports.getUserPostById = (req, res, next) => {
  Post.findOne({
      _id: req.params.id,
      status: '0'
    })
    .then(post => {
      if (!post) {
        return res.status(401).json({
          message: 'Unathourized Access'
        })
      }
      res.status(200).json({
        message: 'Post Fetched',
        post: post
      })
    }).catch(err => {
      res.status(500).json({
        message: err
      })
    })
}

// Get assigned contracts for one User

exports.getUserAssignedContracts = (req, res, next) => {
  Post.find({assign : true, 'contractId.users.userId' : req.user._id })
  .then(posts => {
    res.status(200).json({
      posts : posts
    })
  })
  .catch(err => {
    res.status(500).json({
      message : err
    })
  })
}
