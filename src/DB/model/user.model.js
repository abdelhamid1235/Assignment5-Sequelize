import { DataTypes} from "sequelize"
import { sequelize } from "../connection.db.js";


function checkNameLength(user) {
    if (!user.name || user.name.length <= 2) {
        throw new Error('User name must be longer than 2 characters.');
    }
}
export const UserModel = sequelize.define('User' , 
    {
        id :{
            type: DataTypes.INTEGER ,
            primaryKey:true ,
            autoIncrement:true,
            field :'u_id',
            allowNull :false
        },
        name :{
            type: DataTypes.STRING,
            field :'u_name',
            allowNull :false
        },
        email:{
            type: DataTypes.STRING,
            field :'u_email',
            allowNull :false,
            unique: true ,
            validate:{
                isEmail: {msg :"Invalid Email Format"}
            }
        },
        password :{
            type: DataTypes.STRING,
            field :'u_password',
            allowNull :false,
            validate:{
                checkPasswordLength(value){
                    console.log({value});
                    if(value.length<6){
                        throw new Error("Password Must be greater than 6 characters.")
                    }
                }
            }
        },
        role:{
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            field :'u_role',
            allowNull :false,
        },

        }, 
    
    {
        freezeTableName:false, 
        hooks: {
        beforeCreate(user) {
            checkNameLength(user)
    }
}
    })
















