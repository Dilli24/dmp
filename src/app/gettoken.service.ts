import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {Observable} from 'rxjs';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GettokenService {

  constructor(private http:HttpClient) { }

  gettoken() 
  {

   let promise = new Promise((resolve, reject) => {
         let headers = new HttpHeaders(); 
         headers = headers.set('Content-Type', 'application/json; charset=utf-8');
         headers = headers.set('Authorization','Bearer '+"abcd");

         var data=   {
                        "searchSpan": {
                           "from": {"dateTime":"2019-06-01T00:00:00.000Z"},
                           "to": {"dateTime":"2019-09-01T00:00:00.000Z"},
                        },
                        "top" : {
                           "sort" : [{
                              "input" : {
                                    "builtInProperty" : "$ts"
                              },
                              "order" : "Asc" //Asc
                           }],
                           "count" : 10
                        }
                     }
         
         return this.http.post('https://57dc1c37-301f-4c52-9d8e-ab6adf1c8122.env.timeseries.azure.com/events?api-version=2016-12-12',data,{ headers: headers})
         .toPromise()
         .then(
               res =>{
                  console.log(res)
                  resolve();
               },
               err => {
                  
                  //console.log(err.status);
                  reject(err.status);
               }
            )
      });
      return promise;
  }
}
