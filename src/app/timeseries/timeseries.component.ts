import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GetTimeseriesDataService } from '../timeseries/get-timeseries-data.service';
import { MatSnackBar } from "@angular/material";
import { EncryptDecryptService} from '../encrypt-decrypt.service'





import {Observable} from 'rxjs';
import { any } from 'node_modules1/codelyzer/util/function';
import { from } from 'node_modules1/rxjs';

import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.css']
})
export class TimeseriesComponent implements OnInit {

   datatimes = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
   '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
   dropdowns:any;
  
   fromDt:Date;
   toDt:Date;
   type:string;
   title:string;
   data:any;
   showGrpah:boolean = false;
   showSpinner:boolean = false;   
   headerProperty:any;
   isDisable:boolean=true;
   environmentUrl:any;

   constructor(private http:HttpClient , private timeseriesService: GetTimeseriesDataService, public snackBar: MatSnackBar,private encryptDecrypt:EncryptDecryptService) { 
      this.type = 'LineChart';
      this.title = 'Time series of  Speed';
      this.data = [];
      this.dropdowns=[];  
      this.getEnvironment();
      // this.timeseriesService.observableDemo().subscribe(
      //    res => {
      //       console.log(res);
      //    },
      //    err => {
      //       console.log(err)
      //    }
      // )
   }

   

   ngOnInit() 
   {
   }

   getEnvironment() {
      this.timeseriesService.getEnvironmentList().then(
         res => {
            var arr = [];
            arr.push(res);
            for(var i=0; i<arr.length; i++ ){
               res[i].EnviornmentId =  this.encryptDecrypt.encryptData(res[i].EnviornmentId);
               

            }            
            this.dropdowns = res;
            console.log(res);
         },
         err => {
console.log(err);
         }
      );
   }

   getgraph(fromdate, fromtime, todate, totime){
      if(fromdate ==='' || todate === ''){
         this.snackBar.open("Please select From and To dates.", "", {
            duration: 3000,
         });
         return false;
      }
      else if(fromdate>=todate)
      {
         this.snackBar.open("from date should be less than to date", "", {
            duration: 3000,
         })
      }
      else{
         // this.http.get("https://api.timeseries.azure.com/telemetry?api-version=2016-12-12", { observe: 'response' }).subscribe(res => {
         //    this.headerProperty = res.headers.get('Authorization');
         //    console.log(this.headerProperty);
           
         // });

         this.showGrpah = false;
         this.fromDt = new Date(fromdate+' '+fromtime);
         this.toDt   = new Date(todate+' '+totime);
         this.showSpinner = true;
         this.timeseriesService.getTimeseries(this.fromDt,this.toDt,this.environmentUrl).then(
            res => { // Success
               this.showSpinner = true;
               if(this.timeseriesService.graphData.length == 0){
                  this.showSpinner = false;
                  this.snackBar.open("No data found for selected dates.", "", {
                     duration: 3000,
                  });   
               }else{
                  this.data = this.timeseriesService.graphData;
                  this.showGrpah = true;
                  this.showSpinner = false;
               }
               
            },
            err =>{ //error
               console.log(err);
               if(err==401){
                  this.showGrpah = false;
                  this.showSpinner = false;
                  this.snackBar.open("Token has expired", "", {
                     duration: 3000,
                  });
               }else{
                     console.log(err)
                  this.showGrpah = false;
                  this.showSpinner = false;
                  this.snackBar.open("Something went wrong. Please try after sometime !!!", "", {
                     duration: 3000,
                  });
               }
               
            }
          );   
      }
    
      
   }  

  
   
   
   columnNames = ["Timestamp", "Sum Pressure"];
   options = {   
      hAxis: {
         title: 'Timestamp'
      },
      vAxis:{
         title: 'Sum Pressure'
      },
      pointSize:5
   };
   width = 1100;
   height = 400;

   showDisplay(value)
   {
   //   this.isDisable=false;
   //   console.log(value);

     if(value==0)
     {
      this.isDisable=true; 
     }
     else
     {
        this.environmentUrl = value;
        this.isDisable=false;
     }
   } 

  

// encryptData(value) {

//     try {
//          var enc_string = CryptoJS.AES.encrypt(JSON.stringify(value), "abcd").toString();
//          console.log(enc_string);
//       return  enc_string;
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   decryptData(value) {

//     try {
//       const bytes = CryptoJS.AES.decrypt(value, "abcd");
//       if (bytes.toString()) {
//         return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//       }
//       return value;
//     } catch (e) {
//       console.log(e);
//     }
//   }

}
