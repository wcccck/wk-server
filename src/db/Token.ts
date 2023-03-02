import crypto from 'crypto'
type TokenObject = {
  uid:number,
  expires:number,
  token:string
}

export class Token{
  static instance = new Token()
  static getInstance(){
    return Token.instance
  }

  private tokenCache:Record<string, TokenObject> // token缓存 没过期就拿这个

  private setTokenCache(token:string,tokenobj:TokenObject){
    this.tokenCache[token] = tokenobj
  }
  private getTokenCache(token:string){
    return  this.tokenCache[token] || null
  }
  public verToken(hash:string){
    const token = this.getTokenCache(hash)
    if(!token){
      return null
    }

    if(token.expires > new Date().getTime()){
      return
    }
  }

  createToken(id:number){

    const token = Math.random() + '-' + new Date().getTime()
    const expires = new Date().getTime() + 3600 * 24
    const sha = crypto.createHash('sha1')
    console.log(sha + '---sha')
    sha.update(token)
    const hash = sha.digest('hex')
    const tokenObject = {
      id,
      token:hash,
      expires
    }

  }
}