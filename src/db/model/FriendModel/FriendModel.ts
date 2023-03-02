import {DB} from "../../DB";
import {DataTypes} from "sequelize";
const db = DB.getSequelize()
const FriendModel = db.define('Friend',{
  user_id:{
    type:DataTypes.INTEGER
  },
  friend_id:{
    type:DataTypes.INTEGER
  }
},{
  tableName:"Friend",
  createdAt:true,
  updatedAt:false
})

export default FriendModel