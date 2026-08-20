import { DataTypes, Model} from "sequelize"
import { sequelize } from "../connection.db.js";
import { PostsModel } from "./post.model.js";
import { UserModel } from "./user.model.js";

export class CommentsModel extends Model{}
CommentsModel.init(
    {
        id :{
            type: DataTypes.INTEGER ,
            primaryKey:true ,
            autoIncrement:true,
            field :'c_id',
            allowNull :false
            
        },
        content:{
            type: DataTypes.TEXT,
            field :'c_content',
            allowNull :false,
        },
        userId: {
        type: DataTypes.INTEGER,
        references: {
        model: UserModel,
        key: 'u_id',
    }},

        postId: {
        type: DataTypes.INTEGER,
        references: {
        model: PostsModel,
        key: 'p_id',
    }}
    }, 
    {
        sequelize,
        modelName:'comments'
    })




