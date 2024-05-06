import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: 'folder/home', icon: 'home' },
    { title: 'Choose Mood', url: '/folder/moodChoose', icon: 'add-circle' },
    { title: 'Mood Card', url: '/folder/card-list', icon: 'card' },
    // { title: 'Signout', url: '/folder/spam', icon: 'exit' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  error: any;
  userData: any;
  userId:any;
  showMenu: boolean = false;
  constructor(private apiService:ServiceService,private router:Router) {}
  ngOnInit() {
   setTimeout(() => {
     this.getUser()
   }, 8000); 
  }
  getUser(){
    this.userId= localStorage.getItem('userId');
    this.apiService.getAllUser( this.userId).subscribe({
      next: (res:any) => {
        this.userData=res.data[0]
        console.log(res.data[0]);
        
        // this.router.navigate(['/home']);
        //stroe token in local storage
      },
      error: (err) => {
        console.log('error',err.error);
        this.error = err.error.err;
      }
    });
  }
  signout(){
    this.showMenu = true;
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])

  }
}
