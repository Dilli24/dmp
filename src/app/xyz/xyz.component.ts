import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {
url:string;
status:string;
  constructor() { }

  ngOnInit(){

    this.url=""
    // this.status="smile";
   this.status="sad";
     
     
     this.showimage();
  }
  
 showimage()
 {
   if(this.status==="sad"){
     //alert("Smile!!");
this.url="../assets/images/sad.png";
   }
   else
   {
    alert("sad!!");
     //this.url="../assets/images/sad.png";
   }
 }
  
  


  

 

}
