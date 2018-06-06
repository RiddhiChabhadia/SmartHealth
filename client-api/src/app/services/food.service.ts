import Food from '../models/food.models';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthenticationService, TokenPayload} from '../services/authentication.service';



@Injectable()
export class FoodService {

  api_url = 'http://localhost:3000';
  healthUrl = `${this.api_url}/api/users/food`;


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }




  //Create new meal
  createFood(food: Food): 
  Observable<any>{
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    //returns the observable of http post request 
    return this.http.post(`${this.healthUrl}`+ token, food);
  }

  //update meal
  updateFood(food:Food):Observable<any>{
    const body = food;
    console.log(body+"------");
    const token = localStorage.getItem('mean-token')
    ? '?token=' + localStorage.getItem('mean-token')
    : '';
  
    console.log("token "+token);
    return this.http.put(`${this.healthUrl}/` + food._id + token, body)
    .map((response: Response) => response);


  }

  //delete meal
  deleteFood(food):Observable<any>{
  
   
    const token = localStorage.getItem('mean-token')
    ? '?token=' + localStorage.getItem('mean-token')
    : '';
  
    console.log("token "+token);
    let deleteUrl = `${this.healthUrl}/`+food
    return this.http.delete(deleteUrl+token)
    .map(response => response);


  }


  //search meal by name
  searchFood(food):Observable<any>{
    const body = food;
    console.log(body+"------");
    const token = localStorage.getItem('mean-token')
    ? '?token=' + localStorage.getItem('mean-token')
    : '';
  
    console.log(`http://localhost:3000/api/users/searchfood/`+food+ token, body);
    return this.http.get(`http://localhost:3000/api/users/searchfood/`+food+ token, body)
    .map((res ) => res);

  }

  
  getFood(): Observable<Food[]>{
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
    return response["data"] as Food[];
    })
  }


  //edit meal 
  editFood(food:Food){
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    let editUrl = `${this.healthUrl}`+token;
    return this.http.put(editUrl, food);
  }


//get meal object from id
  getOneMeal(id): Observable<any>{

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