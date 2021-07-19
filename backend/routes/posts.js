const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const isAuth = require('../middleware/isAuth');
const userData = require('../middleware/userData')
const isAdminAuth = require('../middleware/isAdminAuth');
const adminData = require('../middleware/adminData');
const isFile = require('../middleware/file');

// Route to Get all post for Admin
router.get('/api/admin/posts', [isAdminAuth, adminData], postController.getPosts);
// Route to Add a new Post for Admin
router.post('/api/admin/create', [isAdminAuth, adminData], postController.postPosts);
// Route to Get a single Post for Admin
router.get('/api/admin/post/:id/edit', [isAdminAuth, adminData], postController.getPostById);
// Route to update a post for Admin
router.put('/api/admin/post/:id/edit', [isAdminAuth, adminData], postController.postUpdatePost);
// Route to Delete a post for Admin
router.delete('/api/admin/post/:id', [isAdminAuth, adminData], postController.deletePost);
// Route to Get all Opened Posts for Admin
router.get('/api/admin/contracts/:id/applicants', [isAdminAuth, adminData], postController.getAdminApplicationPosts);
// Route to Post assign a user contract for Admin
router.post('/api/admin/contracts/:id/assign', [isAdminAuth, adminData], postController.postAssignContract);



// Users


// Route to Get Opened Post for Users
router.get('/api/users/post', [isAuth, userData], postController.getUserPosts);
// Route to get a Post for Users
router.get('/api/users/post/:id', [isAuth, userData], postController.getUserPostById);
// Route to apply for a contract for Users
router.post('/api/users/post/apply', [isAuth, userData, isFile], postController.postContract);
// Route to get a user contract posts
router.get('/api/users/contracts', [isAuth, userData], postController.getUserAssignedContracts)
module.exports = router;
