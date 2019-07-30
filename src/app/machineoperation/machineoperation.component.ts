import { Component, OnInit } from '@angular/core';
import { GetTimeseriesDataService } from '../timeseries/get-timeseries-data.service';
import { interval } from 'rxjs';



@Component({
  selector: 'app-machineoperation',
  templateUrl: './machineoperation.component.html',
  styleUrls: ['./machineoperation.component.css']
})
export class MachineoperationComponent implements OnInit {

    OperationalState: any;
    message: string;
    modeOpen: number;
    cycleCounter: string;
   url:string;
   status:string;
   cycle_cnt:any;
   tempData:any;
   pressData:any;
   type:string;
   title:string;
   data:any;
   type1:string;
   title1:string;
   data1:any;
   myVar:boolean = true;
   count:number = 0;

  constructor(public timeseries:GetTimeseriesDataService) { 

    interval(5000).subscribe(x => {
        this.myVar = false;
        this.getCyclecount();
        this.getIngectionNozzleData();
        this.url="../assets/images/happy.png";
        this.status = "";
        this.type = 'LineChart';
        this.title = '';
        this.data = [];
        this.title1 = '';
        this.type1 = 'LineChart';
        this.data1 = [];
       
        console.log("innn")
      });
      this.getCyclecount();
      this.getIngectionNozzleData();
      this.url="../assets/images/happy.png";
      this.status = "";
      this.type = 'LineChart';
      this.title = '';
      this.data = [];
      this.title1 = '';
      this.type1 = 'LineChart';
      this.data1 = [];
     

  }

  columnNames = ["Month", "Pressure"];
  options = {   
     hAxis: {
        title: 'Month'
     },
     vAxis:{
        title: 'Pressure'
     },
  };
  width = 850;
  height = 270;

  
  columnNames1= ["Month", "Temperature"];
  options1= {   
     hAxis1: {
        title1: 'Month'
     },
     vAxis1:{
        title1: 'Temperature'
     },
    pointSize:5
  };
  width1 = 850;
  height1 = 270;

  ngOnInit() {
  }

  getCyclecount(){
     this.count = this.count + 1;
      this.timeseries.getToken().then((token) =>
         
         this.timeseries.getCycleCount(token).then(
            res => {
               console.log(token);
               this.status = this.timeseries.image_status;
               this.cycle_cnt = this.timeseries.cycle_cnt;
               this.cycleCounter = this.timeseries.cycleCounter;
               this.modeOpen = this.timeseries.modeOpen;
               this.OperationalState = this.timeseries.OperationalState

               if(this.status==="sad" || this.count == 5){
                  
                  this.url="../assets/images/sad.png";
                  this.message = "Temperature correction of 1 degree recommended.";
                  this.count = 0;
               }
               else
               {
                  this.url="../assets/images/happy.png";
                  this.message = '';
               }
            },
            err => {

            }
         )
      );
  }

  getIngectionNozzleData(){
      // this.timeseries.getInjectionNozzleData().then(
      //    res =>{
      //       console.log(this.timeseries.pressureData)
      //       this.pressData = this.timeseries.pressureData;
      //       this.tempData  = this.timeseries.temperatureData;
      //       this.data = this.pressData;
      //       this.data1 = this.tempData;
      //    },
      //    err => {

      //    }
      // );
      this.timeseries.getToken().then((token) =>
         this.timeseries.getInjectionNozzleData(token).then(
            res =>{
                this.myVar = true;
               console.log(this.timeseries.pressureData);
               this.pressData = this.timeseries.pressureData;
               this.tempData  = this.timeseries.temperatureData;
               this.data = this.pressData;
               this.data1 = this.tempData;
            //    this.data = [["Jan",  7.0],["Feb",  6.9],["Mar",  9.5],["Apr",  14.5],
            //                 ["May",  18.2],["Jun",  21.5],["Jul",  25.2],["Aug",  26.5],
            //                 ["Sep",  23.3],["Oct",  18.3],["Nov",  13.9],["Dec",  9.6]];
            //    this.data1 = [["Jan",  7.0],["Feb",  6.9],["Mar",  9.5],["Apr",  14.5],
            //    ["May",  18.2],["Jun",  21.5],["Jul",  25.2],["Aug",  26.5],
            //    ["Sep",  23.3],["Oct",  18.3],["Nov",  13.9],["Dec",  9.6]];
               
            },
            err => {
            }
         )
      );
  }

}
