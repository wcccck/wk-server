
import DiscoverModel from "../db/model/Discover/DiscoverModel";
import '../db/model/Discover/Sync'
export class DiscoverRepository{
  static inst = new DiscoverRepository()
  static getInstance(){
    return DiscoverRepository.inst
  }

  public async getDiscover(myId:number){
    const result = await DiscoverModel.findAll()
    return result
  }

  public async addDiscover(data){
    const result = await DiscoverModel.create(data)
    return result
  }

  public async commentDiscover(comment:object,id:string|number){
    console.log(comment)
    const result = await DiscoverModel.findOne({
      where:{
        id
      }
    })
    console.log(result.dataValues)
    let resultArr = JSON.parse(result.dataValues.comment) || []
    console.log(resultArr)
    resultArr.push(comment)
    const result2 = await DiscoverModel.update({comment:JSON.stringify(resultArr)},{
      where:{
        id
      }
    })
    console.log(result2)
    return resultArr
  }
}