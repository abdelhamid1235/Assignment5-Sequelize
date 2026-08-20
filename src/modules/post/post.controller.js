import {Router} from 'express'
import { createPost, deletePostByPostId, getPostsAndCountComments, getPostsWithDetails } from './post.service.js'

const router = Router()

// 1- URL: POST /posts
router.post('/' , async(req , res , next)=>{
    const result = await createPost(req.body)
    return res.status(201).json({message :"Post Created Successfully" , post : result})
})

// 2-URL: DELETE /posts/:postId
router.delete('/:postId' , async(req , res , next)=>{

        const result = await deletePostByPostId(req.body,  req.params.postId)
        return res.status(200).json({message :"Post deleted Successfully " ,  result})

})

// 3-Retrieve all posts, including the details of the user who created each post and the associated comments

router.get('/details' ,async(req , res , next)=>{
        const result = await getPostsWithDetails()
        return res.status(200).json({message :"Posts with details retrieved successfully " ,  result})
} )


// 4-Retrieve all posts and count the number of comments associated with each post.
router.get('/comment-count' ,async(req , res , next)=>{
        const result = await getPostsAndCountComments()
        return res.status(200).json({message :"Posts with Comment Counts retrieved successfully " ,  result})
} )

export default router

