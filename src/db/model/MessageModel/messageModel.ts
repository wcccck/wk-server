import {DataTypes} from "sequelize";
import {DB} from "../../DB";

const db = DB.getSequelize()
const MessageModels = db.define('Message',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  from:{
    type: DataTypes.INTEGER,
  },
  to:{
    type: DataTypes.INTEGER,
  },
  msg:{
    type: DataTypes.STRING,
  },
  type:{
    type: DataTypes.INTEGER,
  },
  status:{
    type:DataTypes.INTEGER
  }
},{
  tableName:"Message",
  createdAt:true,
  updatedAt:false
})
export default MessageModels