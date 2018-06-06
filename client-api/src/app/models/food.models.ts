
class Food {

    _id:string;
   public mealName:string;
   public  date: Date;
   public  kcal:String;
   public user:String;
    
    

  
    constructor(
    ){
      this.mealName=""
      this.kcal=""
      this.user=""
      this.date=new Date()

    }
}
export default Food;