import { CommentsModel } from "../../DB/model/comment.model.js";
import { PostsModel } from "../../DB/model/post.model.js"
import { UserModel } from "../../DB/model/user.model.js";


export const createPost = async(inputs)=>{
    const {title , content , userId}  = inputs 
    console.log({userId : userId});
    
    const post = new PostsModel({title , content , userId})
    await post.save()
    return post
}


// 2. Delete a post by its id (Ensure that only the owner of the post can perform this action
export const deletePostByPostId = async(inputs ,postId)=>{

    const { userId } = inputs; 
    const post = await PostsModel.findByPk(postId)
    if(!post){
        throw new Error("Post Not Found" , {cause:{status : 404}})

    }
    if(post.userId!== userId){
        throw new Error("You Are Not Authorized To Delete This Post !" , {cause:{status : 403}})
    }
    await post.destroy()
    return post
}


// 3. Retrieve all posts, including the details of the user who created each post and the associated comments.

export const getPostsWithDetails = async()=>{
            const post = await PostsModel.findAll({attributes: ['id', 'title'],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'name'] 
                },
                {
                    model: CommentsModel, 
                    attributes: ['id', 'content']
                }
            ]})

        return post

}


// 4.Retrieve all posts and count the number of comments associated with each post
export const getPostsAndCountComments = async()=>{
        const posts = await PostsModel.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                model: CommentsModel,
                attributes: [], 
            }
        ],
        distinct: true 
    });
    const result = posts.map(post => ({
        id: post.id,
        title: post.title,
        commentCount: post.Comments ? post.Comments.length : 0
    }));

    return result;

}