import {UserModel} from '../../DB/model/user.model.js'


export const createUser = async(inputs)=>{
    const {name , email , password , age , role } = inputs
    const checkUserExist =await UserModel.findOne({where : {email }})
    if(checkUserExist){
        throw new Error("Email already Exist !")
    }
    const user  = UserModel.build({name , email , password , age , role})
    await user.save()
    return user 
}


// 2. Create or update based on PK and use skip validation option.

export const UpdateOrCreateUser = async(inputs , id )=>{
    const user = await UserModel.upsert({ id , ...inputs }, {validate:false})
    return user

}


// 3. Write an API endpoint to find a user by their email address


export const getUserByEmail = async (email) => {
    const user = await UserModel.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error("No User Found", {
            cause: { status: 404 }
        });
    }

    return user;
};

// 4. Retrieve a user by their PK, excluding the “role” field from the response
export const getUserById = async(userId)=>{
    const user = await UserModel.findByPk(userId , {attributes:{exclude:['role']}})

    if (!user) {
        throw new Error("No User Found", {
            cause: { status: 404 }
        });
    }

    return user
}







