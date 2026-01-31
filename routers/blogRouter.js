const express = require('express')

const {postBlog, editBlog, getBlogById, getAllBlogs, deleteBlogById} = require("../controllers/blogController")


const blogRouter =  express.Router()

// create a user api
blogRouter
    .post('/post-blog', postBlog)
    //to edit blog
     .put('/edit-blog/:id', editBlog)
    //to get a blog
    .get('/get-blog/:id', getBlogById)
    //get all blogs
    .get('/getAllBlogs', getAllBlogs)
     //delete blog
    .delete('/delete-blog/:id', deleteBlogById)








        module.exports = blogRouter
