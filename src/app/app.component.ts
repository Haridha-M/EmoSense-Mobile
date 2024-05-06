import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  error: any;
  userData: any;
  userId:any;
  constructor(private apiService:ServiceService,private router:Router,private menuController: MenuController ) {}
  ngOnInit() {
   setTimeout(() => {
     this.getUser()
   },2000 ); 
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
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
    this.menuController.close();
  }
}
