import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  api_url = 'http://localhost:3000';
  healthUrl = `${this.api_url}/api/users`;

  constructor(
    private http: HttpClient
  ) { }




  //create new user
  createUser(user: User): Observable<any> {
    //returns the observable of http post request 
    return this.http.post(`${this.healthUrl}`, user);
  }



  autheticateUser(user: User): Observable<any> {

    return this.http.post(`${this.healthUrl}/login`, user);
  }

//get users
  getUsers(): Observable<any> {
    return this.http.get(this.healthUrl)
      .map((response: Response) => {
        //Maps the response object sent from the server
        console.log(response["data"]["docs"]);
        return response["data"]["docs"];
      })
  }
  //Update user
  editUser(user: User) {
    let editUrl = `${this.healthUrl}`
    //returns the observable of http put request
    console.log(editUrl,user);
    return this.http.put(editUrl, user);
  }

  //delete user
  deleteUser(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.healthUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
//send email on sign up
  sendMail(user: User): Observable<any> {
    //returns the observable of http post request 
    return this.http.post(`${this.healthUrl}/sendMail`, user);
  }

  getUserByMail(): Observable<any> {
    const token = localStorage.getItem('mean-token')
            ? '?token=' + localStorage.getItem('mean-token')
            : '';
            console.log("token "+token);
    let serachUrl = `${this.healthUrl}/searchbyEmail`
    console.log(serachUrl+token);
    return this.http.get(serachUrl+token)
      .map((response: Response
      ) => {

        console.log(response["data"]);
        //   //Maps the response object sent from the server
        //    //console.log(res["data"].doc+"-------gettt resss ---------");
        // // return res["data"].docs as Exercise[];
        return response["data"];
      })
  }
}