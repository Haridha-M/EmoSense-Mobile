import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: any;
  private activatedRoute = inject(ActivatedRoute);
  userId: any;
  userData: any;
  error: any;
  constructor(private appComponent: AppComponent,private apiService:ServiceService) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder = id;
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
}

