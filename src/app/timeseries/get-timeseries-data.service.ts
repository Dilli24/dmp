import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import * as config from '../../config/config.json';
import { GettokenService } from '../gettoken.service';
import {EncryptDecryptService} from '../encrypt-decrypt.service';
import { map } from 'rxjs/operators';


@Injectable({
      providedIn: 'root'
})
export class GetTimeseriesDataService {

      OperationalState: any;
      modeOpen: number;
      cycleCounter: string;
      constructor(private http: HttpClient, private tokenservice: GettokenService,private encryptdecrypt:EncryptDecryptService) {
      }

      graphData = [];
      cycle_cnt = [];
      image_status: string = 'happy';
      pressureData = [];
      temperatureData = [];



      //token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIxMjBkNjg4ZC0xNTE4LTRjZjctYmQzOC0xODJmMTU4ODUwYjYiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83NmEyYWU1YS05ZjAwLTRmNmItOTVlZC01ZDMzZDc3YzRkNjEvIiwiaWF0IjoxNTYyMTQ3NjIyLCJuYmYiOjE1NjIxNDc2MjIsImV4cCI6MTU2MjE1MTUyMiwiYWlvIjoiNDJaZ1lIQXhDbCtjRVNNWnVYOU8rTU0xeng3c25WY2JvdVF5aHl0bVdYSjJiZmh1aFI4QSIsImFtciI6WyJ3aWEiXSwiZmFtaWx5X25hbWUiOiJTaGV0ZSIsImdpdmVuX25hbWUiOiJBa2hpbGVzaCIsImluX2NvcnAiOiJ0cnVlIiwiaXBhZGRyIjoiMjAzLjE4OS4xODEuMTM1IiwibmFtZSI6IlNoZXRlLCBBa2hpbGVzaCIsIm5vbmNlIjoiM2QxYzJlNGMtNDlkNC00YzQ3LTg1ODgtMTRkOGRkNmI0MGM4Iiwib2lkIjoiNWJlOWEwMzMtNmU3NC00MTIwLTg0MzktMTUzMWJjOGEwOTU5Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTE1MzEwODIzNTUtNzM0NjQ5NjIxLTM3ODI1NzQ4OTgtMzQ0NTkwNSIsInB1aWQiOiIxMDAzMjAwMDM4NEJCNDBDIiwic3ViIjoialhhUVpFSjh1Y2tKNGdndk1Kcm1QZHhfTXlEWkdHTFh4ajU2Y3RUVjluUSIsInRpZCI6Ijc2YTJhZTVhLTlmMDAtNGY2Yi05NWVkLTVkMzNkNzdjNGQ2MSIsInVuaXF1ZV9uYW1lIjoiYWtoaWxlc2guc2hldGVAY2FwZ2VtaW5pLmNvbSIsInVwbiI6ImFraGlsZXNoLnNoZXRlQGNhcGdlbWluaS5jb20iLCJ1dGkiOiJBYXBGVUh2SHNVdVNXMWlBOGRnWEFBIiwidmVyIjoiMS4wIn0.KW7fEjEXvhe0A2rbgfUR7Q9hG1PnxZ3uorsiMYLCgJcIKy26ZgdftkH2tK91VrjDXwJADRLkEkigDWyE0whETvy598nuBOhLsEVJnOEFSw62ME-yNrtrMwRvmJ-0NwY_cIwPCP8cxMLDn9Z3polYkO_GP0bdimMsce6r-bRhpU0CIvE7loWvSm5CPSuaLaPLgCtPRfj6yKbPPF33ibmks1v4SmTFM1X8BK0e3j3koJFXUIMUzG7m5aD53yqp8DfYeQRSVThdj25le8q_VRO1ug0RYtJ7yGHIokT_m26d_gZHrTi0UmK3WRvPJfqkOGf0g0Ym8_Qw3WcDQiCmHvp3vw';
      getEnvironmentList()
      {
      let promise = new Promise((resolve, reject) => {
            let headers = new HttpHeaders(); 
            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      return this.http.get('http://timeseriesapp.azurewebsites.net/api/TimeSeries/GetEnvironmentList',{headers:headers})
      .toPromise()
      .then(
            res=>{
            console.log(res);
            
            resolve(res);
            },
            err => {                  
            console.log(err.status);
            reject(err.status);
            }
      )
      
      });
      return promise;

      };

      observableDemo() : Observable<any[]> {
            return this.http.get("http://dummy.restapiexample.com/api/v1/employees")
             //.map((res:Response) => 
             .pipe(map((response: any) => {
                  return response;
             }
             ));

      }

      getTimeseries(fromDt:Date,toDt:Date,environmentUrl:any) { //

      let promise = new Promise((resolve, reject) => {
            let headers = new HttpHeaders(); 
            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
            headers = headers.set('Authorization','Bearer '+config.token);
            
            var data=   {
                              "searchSpan": {
                              "from": {"dateTime": fromDt},
                              "to": {"dateTime": toDt}
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
            environmentUrl = this.encryptdecrypt.decryptData(environmentUrl);   
            return this.http.post('https://'+environmentUrl+'/events?api-version=2016-12-12',data,{ headers: headers})
            .toPromise()
            .then(
                  res =>{
                        this.graphData = [];
                        var response = res['events'];
                        for(var i=0; i< response.length; i++){
                        var temp = [];
                        var datePipe = new DatePipe("en-US");
                        var value = datePipe.transform(response[i].$ts, 'dd-MMM-yy h:mm:ss');
                        temp.push(value);
                        temp.push(parseInt(response[i].values[0]));
                        this.graphData.push(temp);
                        }
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

      getInjectionNozzleData(token1) {



            let promise =
                  new Promise((resolve,
                        reject) => {

                        let headers = new HttpHeaders();

                        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
                        headers = headers.set('Authorization', 'Bearer ' + token1);
                        var data = {
                              "searchSpan": {
                                    "from": { "dateTime": new Date("2019-07-15T00:00:00.000Z") },
                                    "to": {
                                          "dateTime":
                                                new Date("2019-07-15T18:30:00.000Z")
                                    },
                              },
                              "top": {
                                    "sort": [{
                                          "input": {
                                                "builtInProperty":
                                                      "$ts"
                                          },
                                          "order":
                                                "Asc" //Asc
                                    }],
                                    "count":
                                          70
                              }
                        }
                        return this.http.post('https://8b1338c6-d8ac-4d70-a753-4d7c3e5924c1.env.timeseries.azure.com/events?api-version=2016-12-12', data, {
                              headers: headers
                        })
                              .toPromise()
                              .then(
                                    res => {
                                          var response = res['events'];
                                          this.pressureData = [];
                                          this.temperatureData = [];
                                          for (var i = 0; i < response.length; i++) 
                                          {
                                                if (response[i]['values'][1] === 'InjectionPressure') {
                                                      
                                                      var datePipe = new DatePipe("en-US");

                                                      //var value = datePipe.transform(response[i].values[3], 'dd-MMM-yy h:mm:ss');
                                                      var jsonP = [response[i].values[3], response[i].values[2]];
                                                      this.pressureData.push(jsonP);
                                                }

                                                if (response[i]['values'][1] === 'NozzleTemp') {

                                                      //var value1 = datePipe.transform(response[i].values[3], 'dd-MMM-yy h:mm:ss');
                                                      var jsonT = [response[i].values[3], response[i].values[2]];
                                                      this.temperatureData.push(jsonT);
                                                }
                                          }
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


      getCycleCount(token1) {

            let promise = new Promise((resolve, reject) => {
                  let headers = new HttpHeaders();
                  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
                  headers = headers.set('Authorization', 'Bearer ' + token1);

                  var data = {
                        "searchSpan": {
                              "from": { "dateTime": new Date("2019-07-15T00:00:00.000Z") },
                              "to": { "dateTime": new Date("2019-07-15T18:31:00.000Z") },
                        },
                        "top": {
                              "sort": [{
                                    "input": {
                                          "builtInProperty": "$ts"
                                    },
                                    "order": "Asc" //Asc
                              }],
                              "count": 100
                        }
                  }

                  return this.http.post('https://8b1338c6-d8ac-4d70-a753-4d7c3e5924c1.env.timeseries.azure.com/events?api-version=2016-12-12', data, { headers: headers })
                        .toPromise()
                        .then(
                              res => {
                                    this.cycle_cnt = [];
                                    var response = res['events'];
                                    for (var i = 0; i < response.length; i++) {
                                          var datePipe = new DatePipe("en-US");
                                          var value = datePipe.transform(new Date(), 'dd-MMM-yy');
                                          //var data = { "result": response[i].values[8], "confidence": response[i].values[9], "timestamp": value }
                                          var data = { "result": "IO", "confidence": "0.9998769674574", "timestamp": value }
                                          if(i <=4)
                                          { this.cycle_cnt.push(data);}
                                         

                                          if (response[i]['values'][1] === 'CycleCounter') {
                                                this.cycleCounter = response[i]['values'][2];
                                          }
                                          if (response[i]['values'][1] === 'Open') {
                                                this.modeOpen = 1;
                                          }
                                          if (response[i]['values'][1] === 'OperationalState') {
                                                this.OperationalState = response[i]['values'][2];
                                          }


                                    }

                                    if (response[(response.length - 1)].values[8] === 'NIO') {
                                          this.image_status = 'sad';
                                    }

                                  

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

      getToken() {
            const promise = new Promise((resolve, reject) => {

                  //       const headers = new HttpHeaders({
                  //                 'Access-Control-Allow-Origin': '*', // -->Add this line
                  //                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                  //                 'Access-Control-Allow-Headers': '*',
                  //                 'Content-Type': 'application/json',
                  //                 'Accept': 'application/json'
                  //          });
                  //          const requestOption = { headers: headers};

                  //          const data = new HttpParams()
                  //                         .set('client_id', '33622dd5-986b-44bd-a4e7-dfac380aede5')
                  //                         .set('client_secret', 'n2G/@zP+822?HO55=kw65[xDVll/dmgs')
                  //                         .set('grant_type', 'client_credentials');

                  //          this.http.post('https://login.microsoftonline.com/405992ab-4eb4-47b6-8c72-322cd532e984/oauth2/token',data,requestOption)
                  //          .subscribe((response) => { resolve(response)});
                  //    });


                  resolve(config.token);
            });
            return promise;

      }

}
