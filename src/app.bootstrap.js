import express from 'express'

import { userRouter , postRouter , commentRouter } from './modules/index.js'
import { NODE_ENV, port } from '../config/config.service.js'

import { asyncDBConnection, checkDBConnection } from './DB/connection.db.js';

import './DB/model/index.js'

console.log({NODE_ENV});

async function bootstrap(){
const app = express()
        app.use(express.json())
        await checkDBConnection()
        await asyncDBConnection()
        app.use('/users', userRouter)
        app.use('/posts' ,postRouter)
        app.use('/comments' , commentRouter)
                app.use('{/*dummy}' , (req , res , next)=>{
                return res.status(404).json({message : "invalid routing "})
        })
        app.use((error ,  req , res , next )=>{
            const status = error.cause?.status?? 500
            return res.status(status).json({
                error_message :   status == 500? 'something went wrong ': error.message ??'something went wrong ',
                stack : NODE_ENV == 'development' ? error.stack : undefined
            })
        })
        app.listen(port , ()=>{
            console.log(`Listening on port ${port}`);
            
        })
}
export default bootstrap