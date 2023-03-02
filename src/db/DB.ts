import {Sequelize} from 'sequelize'
import path from "path";

export class DB{
  static sequelize:Sequelize
  static getSequelize(){
    if(!DB.sequelize){
      DB.sequelize = new Sequelize ({
        database:'mydb',
        dialect:'mysql',
        // host:'http://localhost',
        port:3306,
        logging:true,
        username:'s1mple',
        password:"sbkill1r"
        // storage:path.resolve(__dirname,'mydb.db')
      })
    }
    return DB.sequelize
  }
}