import {DataTypes} from "sequelize";
import {DB} from "../../DB";

const db = DB.getSequelize()
const User = db.define("User",{
  username:{
    type:DataTypes.STRING
  },
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
  tableName:"User",
  updatedAt:false,
  createdAt:false
});

export default User