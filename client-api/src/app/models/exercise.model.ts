
class Exercise {

    _id:string;
   public exerciseName:string;
   public  date: Date;
   public  reps:String;
   public user:String;
    
    


    constructor(
    ){
      this.exerciseName=""
      this.reps=""
      this.user=""
      this.date=new Date()

    }
}
export default Exercise;