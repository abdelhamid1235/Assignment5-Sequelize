import { DataTypes, Model} from "sequelize"
import { sequelize } from "../connection.db.js";
import {UserModel} from './user.model.js'

export class PostsModel extends Model{}
PostsModel.init(
    {
        id :{
            type: DataTypes.INTEGER ,
            primaryKey:true ,
            autoIncrement:true,
            field :'p_id',
            allowNull :false
        },
        title:{
            type: DataTypes.STRING,
            field :'p_title',
            allowNull :false
        },
        content:{
            type: DataTypes.TEXT,
            field :'p_content',
            allowNull :false,
        },
        userId: {
        type: DataTypes.INTEGER,
        allowNull :false,
        references: {
        model:UserModel,
        key: 'u_id',
    }
}
    }
  , 
    {
        sequelize,
        tableName:"posts" ,
        // soft-delete (paranoid) to post table. 
        paranoid:true

    })
