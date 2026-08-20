import { Op } from "sequelize";
import { CommentsModel } from "../../DB/model/comment.model.js";
import { UserModel } from "../../DB/model/user.model.js";
import {PostsModel} from '../../DB/model/post.model.js'
 // 1. Create a bulk of Comments. (0.5 Grade)
export const createComment = async(inputs)=>{

    const comments = await CommentsModel.bulkCreate(inputs , {fields:['content' , 'postId' , 'userId']})
    return comments
}


// 2. Update the content of a specific comment by its ID. (Ensure that only the owner of the comment can perform this
export const updateCommentById = async(inputs , commentId)=>{

    const { userId , content } = inputs; 
    const comment = await CommentsModel.findByPk(commentId) 
    if(!comment){
        throw new Error("Comment Not Found" , {cause:{status : 404}})

    }
    if(comment.userId!== userId){
        throw new Error("You Are Not Authorized To Update This Comment !" , {cause:{status : 403}})
    }
    const result = await CommentsModel.update({content} , {where:{id:commentId}})
    return result
}



// 3. find a comment for a specific post, user, and content. If the comment exists, return it, otherwise, create a new

export const findOrCreateComment = async(inputs)=>{
const {content , postId , userId} = inputs
const [comment, created] = await CommentsModel.findOrCreate({
        where: {
            postId,
            userId,
            content
        },
        defaults: {
            postId,
            userId,
            content
        }
    });
    return [comment, created]

}
// Retrieve all comments that contain a specific word in their content and return the number of comments matched
export const searchCommentsByWord = async (word) => {
    if (!word) throw new Error("Search word is required", { cause: { status: 400 } });

    const result = await CommentsModel.findAndCountAll({
        where: {
            content: {
                [Op.like]: `%${word}%` 
            }
        },
        attributes: ["id", "content"] 
    });

    return result;
};


// 5. Retrieve the 3 most recent comments for a specific post, ordered by creation date. (0.5 Grade)

export const getNewestCommentsForPost = async (postId) => {
    const comments = await CommentsModel.findAll({
        where: { postId },
        order: [['createdAt', 'DESC']], 
        limit: 3,
        attributes: ['id', 'content', 'createdAt']
    });

    return comments;
};


// 6. Get Specific Comment By PK with User and Post Information. (0.5 Grade)

export const getCommentWithDetails = async (commentId) => {
    const comment = await CommentsModel.findByPk(commentId, {
        include: [
            {
                model: UserModel,
                attributes: ['id', 'name' , 'email']
            },
            {
                model: PostsModel,
                attributes: ['id', 'title' , 'content']
            }
        ]
    });

    if (!comment) {
        throw new Error("Comment Not Found", { cause: { status: 404 } });
    }

    return comment;
};
