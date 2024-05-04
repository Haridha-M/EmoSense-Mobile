import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  login(data:any){
    return this.http.post(`${environment.url}/user/login`,data);
  }
  getAllUser(id:number){
    return this.http.get(`${environment.url}/user/getAllUser/${id}`);
  }
}
