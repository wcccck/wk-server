import {DB} from "../../DB";
import {DataTypes} from "sequelize";
const db = DB.getSequelize()
const FriendModel = db.define('Friend',{
  user_id:{
    type:DataTypes.INTEGER
  },
  friend_id:{
    type:DataTypes.INTEGER
  },
  friend_name:{
    type:DataTypes.STRING
  },
  friend_image:{
    type:DataTypes.STRING
  },
  alias:{
    type:DataTypes.STRING
  },
  friend_chatId:{
    type:DataTypes.STRING
  }
},{
  tableName:"Friend",
  createdAt:true,
  updatedAt:false
})

export default FriendModel