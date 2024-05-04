import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: 'folder/home', icon: 'mail' },
    { title: 'Choose Mood', url: '/folder/moodChoose', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  error: any;
  userData: any;
  constructor(private apiService:ServiceService) {}
  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.apiService.getAllUser(3).subscribe({
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
}
