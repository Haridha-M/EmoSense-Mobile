import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-mood-choose',
  templateUrl: './mood-choose.component.html',
  styleUrls: ['./mood-choose.component.scss'],
})
export class MoodChooseComponent  implements OnInit {
  currentDate:any;
  error: any;
  userData: any;
  constructor(private apiService:ServiceService) {}
  ngOnInit(): void {
    this.getUser()
    this.currentDate =this.getCurrentDate();
    console.log(this.currentDate);
    
  }
  getCurrentDate() {
    const today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[today.getMonth()];
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
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
