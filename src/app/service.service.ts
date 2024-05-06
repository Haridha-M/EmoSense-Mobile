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
  signUp(data:any){
    return this.http.post(`${environment.url}/user/signUp`,data);
  }
  getAllUser(id:number){
    return this.http.get(`${environment.url}/user/getAllUser/${id}`);
  }
  getAllMood(){
    return this.http.get(`${environment.url}/user/getAllMood`);
  }
  addMood(data:any){
    return this.http.post(`${environment.url}/user/addMood`,data);
  }
  getAllMoodStatus(id:any){
    return this.http.get(`${environment.url}/user/getAllMoodStatus/${id}`);
  }
  getCardList(){
    return this.http.get(`${environment.url}/user/getCardList`);
  }
  addNotes(id:number,data:any){
    return this.http.post(`${environment.url}/user/addNotes/${id}`,data);
  }
}
