import {Router} from 'express'


import {createUser , getUserById, getUserByEmail, UpdateOrCreateUser} from './user.service.js'
const router = Router()

// 1- Create a new user

router.post('/signup' , async(req , res , next)=>{
    const result = await createUser(req.body)
    return res.status(201).json({message:"User Added Successfully ." , result})

})

// 2- Create or update based on PK and use skip validation option.

router.put('/:userId' , async(req , res , next)=>{
    const result = await UpdateOrCreateUser(req.body , req.params.userId)
    return res.status(200).json({message: "User created Or Updated Successfully ." , result})
})


// 3. Write an API endpoint to find a user by their email address.
router.get('/by-email' ,  async(req , res , next)=>{
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({
                message: "Email query parameter is required"
            });
        }
        const result = await getUserByEmail(email)
        return res.status(200).json({message: "Found Successfully ." , result})
})




// 4. Retrieve a user by their PK, excluding the “role” field from the response

router.get('/:userId' ,  async(req , res , next)=>{
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                message: "User Id Params is required"
            });
        }
        const result = await getUserById(userId)
        return res.status(200).json({message: "Found Successfully ." , result})
})

export default router

