import {DataTypes} from "sequelize";
import {DB} from "../../DB";
const db = DB.getSequelize()
const disModel = db.define('discover',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  author_id:{
    type:DataTypes.STRING
  },
  author_name:{
    type:DataTypes.STRING
  },
  headImage:{
    type:DataTypes.STRING
  },
  msgText:{
    type:DataTypes.STRING
  },
  msgImages:{
    type:DataTypes.STRING
  },
  comment:{
    type:DataTypes.STRING
  }

},{
  tableName:"discover",
  createdAt:true,
  updatedAt:false
})
export default disModel
