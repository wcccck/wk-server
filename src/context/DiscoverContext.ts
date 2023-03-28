import {DiscoverRepository} from "../repo/DiscoverRepository";
export class DiscoverContext{
  private DiscoverStore = DiscoverRepository.getInstance()
  static Instance = new DiscoverContext()

  static getInstance(){ // 单例
    return DiscoverContext.Instance
  }

  public async getMyFrDiscover(myId:number){
    const result = await this.DiscoverStore.getDiscover(1)
    return result
  }

  public async sendDiscover(data){
    const result = await this.DiscoverStore.addDiscover(data)
    return result
  }

  public async commentDiscover(comment:object,id:string|number){
    const result =await this.DiscoverStore.commentDiscover(comment,id)
    return result
  }



}