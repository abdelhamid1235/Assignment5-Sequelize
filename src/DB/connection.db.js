import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../../config/config.service.js'

import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port:3306 ,
    dialect: 'mysql' 

})
export const checkDBConnection= async()=>{
    try {
    await sequelize.authenticate();
    console.log('Connection has been successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }

}
export const asyncDBConnection=  async()=>{
    try {
    await sequelize.sync({alter:true, force:false, match: /_test$/ });
    console.log('Connection SYNC  has been established successfully.');
    } catch (error) {
    console.error('Unable  SYNC to connect to the database:', error);
    }
}

