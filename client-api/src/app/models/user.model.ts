 class User {

                _id:string;
                public email: string;
                public password: string;
                public firstName?: string;
                public lastName?: string;
                public age?: string;
                public height?: string;
                public weight?: string;
                public gender?: string;

                constructor(
                ){
                  this.firstName=""
                  this.lastName=""
                  this.password=""
                  this.age=""
                  this.height=""
                  this.weight=""
                  this.gender=""
                  this.email=""
                }
}
export default User;