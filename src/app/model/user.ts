export class User{
  private uid:string;
  private username:string;
  private email:string;
  constructor(uid:string, name:string, email:string){
    this.uid = uid;
    this.username = name;
    this.email = email;
  }
  public getUid():string{
    return this.uid;
  }
  public getUsername():string{
    return this.username;
  }
  public getEmail():string{
    return this.email;
  }

}
