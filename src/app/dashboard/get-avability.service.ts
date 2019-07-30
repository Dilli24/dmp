import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAvabilityService {

  
  constructor(private http: HttpClient) { }

  getAvailibility() {

    return this.http.get("http://cosmosdbdemo.azurewebsites.net/api/compressor");
  
     }
  
}
