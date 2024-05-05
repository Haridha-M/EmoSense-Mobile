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
  moodData: any;
  moodImages = [
    '/assets/smileys/happy.png',
    '/assets/smileys/sad.png',
    '/assets/smileys/anger.png',
    '/assets/smileys/excited.png',
    '/assets/smileys/bored.png',
    '/assets/smileys/confused.png',
    '/assets/smileys/calm.png',
    '/assets/smileys/tired.png',
    '/assets/smileys/disappointment.png'
  ];
  userId: any;

  constructor(private apiService:ServiceService) {}
  ngOnInit(): void {
    this.getUser()
    this.getMood()
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
onchange(userId: string, event: Event){
console.log(userId,'lllll');
 const payload={
  moodStatusId:userId,
  statusUserId:this.userData.id
}
this.apiService.addMood(payload).subscribe({
  next: (data:any) => {
    console.log('data',data);
    // this.router.navigate(['/home']);
    //stroe token in local storage
  },
  error: (err) => {
    console.log('error',err.error);
    this.error = err.error.err;
  }
});
}

  getUser(){
    this.userId= localStorage.getItem('userId');
    
   
    this.apiService.getAllUser(this.userId).subscribe({
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
  getMood(){
    this.apiService.getAllMood().subscribe({
      next: (res:any) => {
        this.moodData=res.data
      },
      error: (err) => {
        console.log('error',err.error);
        this.error = err.error.err;
      }
    });
  }
}
