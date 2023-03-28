export class FirendList{
  private static instance:FirendList

  public static getInstance(){
    if(!FirendList.instance){
      return new FirendList()
    }else{
      return FirendList.instance
    }
  }
}