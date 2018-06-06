import Exercise from '../models/exercise.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthenticationService, TokenPayload} from '../services/authentication.service';



@Injectable()
export class ExerciseService {

  api_url = 'http://localhost:3000';
  healthUrl = `${this.api_url}/api/users/exercise`;


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }




  //Create todo, takes a exercise Object
  createExercise(exercise: Exercise): 
  Observable<any>{
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    //returns the observable of http post request 
    return this.http.post(`${this.healthUrl}`+ token, exercise);
  }


  //update exercise
  updateExercise(exercise:Exercise):Observable<any>{
    const body = exercise;
    console.log(body+"------bodyyyyy");
    const token = localStorage.getItem('mean-token')
    ? '?token=' + localStorage.getItem('mean-token')
    : '';
  
    console.log("token "+token);
    return this.http.put(`${this.healthUrl}/` + exercise._id + token, body)
    .map((response: Response) => response);


  }

//search exercise by name
  searchExercises(exercise):Observable<any>{
    const body = exercise;
    console.log(body+"------");
    const token = localStorage.getItem('mean-token')
    ? '?token=' + localStorage.getItem('mean-token')
    : '';
  
    console.log("token "+token);
    return this.http.get(`http://localhost:3000/api/users/search/`+exercise+ token, body)
    .map((res ) => res);


  }




  //dlete exercise by id

  deleteExercise(exercise):Observable<any>{
  
   
    const token = localStorage.getItem('mean-token')
    ? '?token=' + localStorage.getItem('mean-token')
    : '';
  
    console.log("token "+token);
    let deleteUrl = `${this.healthUrl}/`+exercise
    return this.http.delete(deleteUrl+token)
    .map(response => response);


  }

//sort exercise by name
  sortByExerciseName(): Observable<any>{
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    return this.http.get(this.healthUrl+'s/sortbyExerciseName'+token)
    .map((response:Response
    )  => {

       console.log(response+"sort by ex name");
    //   //Maps the response object sent from the server
       console.log(response["data"]+"-------gettt resss  in ex name sort---------");
    // // return res["data"].docs as Exercise[];
    return response;
    })
  }

//sort exercise by date
  sortByExerciseDate(): Observable<any>{
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    return this.http.get(this.healthUrl+'s/sortbyExerciseDate'+token)
    .map((response:Response
    )  => {

       console.log(response+"sort by ex date");
    //   //Maps the response object sent from the server
       console.log(response["data"]+"-------gettt resss  in ex date sort---------");
    // // return res["data"].docs as Exercise[];
    return response;
    })
  }


//get list of exercise for user
  getExercise(): Observable<Exercise[]>{
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    return this.http.get(this.healthUrl+token)
    .map((response:Response
    )  => {

    //   console.log(response);
    //   //Maps the response object sent from the server
    //    //console.log(res["data"].doc+"-------gettt resss ---------");
    // // return res["data"].docs as Exercise[];
    return response["data"] as Exercise[];
    })
  }


  //edit exercise
  //Update todo, takes a ToDo Object as parameter
  editExercise(exercise:Exercise){
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    let editUrl = `${this.healthUrl}`+token;
    return this.http.put(editUrl, exercise);
  }



//get exercise obj from id
  getOneExercise(id): Observable<any>{

console.log("inside method");

    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);

            console.log(this.healthUrl+"/"+id+token+"url for each get")
    return this.http.get(this.healthUrl+"/"+id+token)
    .map((response:Response
    )  => {
       console.log(response["data"]+"-------gettt one exxx resss ---------");
    return response["data"] ;
    })

  }



  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



}