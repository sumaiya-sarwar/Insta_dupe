const express = require("express");
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

const db = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const allComments = await db.Comment.find()
        .populate('Posts')
        .exec()
        const allPosts = await db.Posts.find({})
        res.render('comments', {comments: allComments, posts: allPosts})
    }
    catch (err) {
        console.log(err);
        req.error = err;
        return next();
    }
});
// new comment
router.post('/', async (req, res, next) => {
    try{
        
        if(req.session){ 
    
        const comment = {
            ...req.body,
            user: req.session.currentUser.id,
            username: req.session.currentUser.username,
        }
        const newComment = await db.Comments.create(comment)
        console.log(newComment)
        res.redirect('/main/'+newComment.post)
        }
        // console.log(req.session)
    }
    catch (err) {
        console.log(err);
        req.error = err;
        return next();
    }
})

// edit
router.get('/:commentId/editcomments', async (req, res, next)=>{
    try{
        const editComment = await db.Comment.findById(req.params.commentId);
        res.render('editcomments', {selectedComment: editComment})
    }
    catch(err){
        console.log(err)
        req.error = err
        return next()
    }
})
// update
router.post('/:commentId', async (req, res, next) => {
    try{
        const updatedComment = await db.Comment.findByIdAndUpdate(req.params.commentId, req.body, {new: true})
        
        res.redirect(`/posts/${updatedComment}`)
    }
    catch(err){
        console.log(err)
        req.error = err
        return next();
    }
})

// delete 
router.delete('/:commentId',async (req, res, next)=>{
    try{
        const deleteComment = await db.Comments.findByIdAndDelete(req.params.commentId)
        res.redirect('/main/'+deleteComment.post)
    }
    catch(err){
        console.log(err)
        req.error = err
        return next()
    }
})
module.exports = router