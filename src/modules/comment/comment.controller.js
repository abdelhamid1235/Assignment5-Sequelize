import {Router} from 'express'
import { createComment, findOrCreateComment, updateCommentById  , searchCommentsByWord, getNewestCommentsForPost, getCommentWithDetails } from './comment.service.js'

const router = Router() 
// 1-URL: POST /comments

router.post('/' , async(req , res , next)=>{
    const result = await createComment(req.body)
    return res.status(201).json({message :"Comments Created Successfully" , post : result})

})


// 2- URL: PATCH /comments/:commentId
router.patch('/:commentId' , async(req , res , next)=>{
    const result = await updateCommentById( req.body , req.params.commentId)
    return res.status(201).json({message :"Comments UpdatedSuccessfully" , result})

})


// 3- URL: POST /comments/find-or-create
router.post('/find-or-create' , async(req , res , next)=>{
    const [comment , created]= await findOrCreateComment( req.body)
    return res.status(created ? 201 : 200).json(
        {  message: created? "Comment Created Successfully": "Comment Already Exists",
        result:comment})

})

// URL: GET /comments/search => (for example /comments/search?word=the)

router.get('/search' , async(req , res , next)=>{
        const { word } = req.query;

        const result = await searchCommentsByWord(word);
        return res.status(200).json({
        message: result.count === 0 
            ? "No Comments Found" 
            : `${result.count} CommentS Found`,
        result
        })

})


// o URL: GET /comments/newest/:postId

router.get('/newest/:postId', async (req, res, next) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }

    const result = await getNewestCommentsForPost(postId);

    return res.status(200).json({
        message: result.length === 0
            ? "No comments found for this post"
            : "Newest comments retrieved successfully",
        result
    });
});


// / o URL: GET /comments/details/:id

router.get('/details/:id', async (req, res, next) => {
    const { id } = req.params;

    const result = await getCommentWithDetails(id);

    return res.status(200).json({
        message: "Comment details retrieved successfully",
        result
    });
});

export default router


