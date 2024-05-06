import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss'],
})
export class ViewNotesComponent  implements OnInit {

  notes: string = '';
  @Input() viewId: any;
  error: any;
  userId:any;
  constructor(private modalCtrl: ModalController,private apiService:ServiceService) {}
  ngOnInit() {
    console.log(this.viewId,'kkkkkkkkk');
    this.submitNotes()
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  confirm() {

    console.log(this.notes,'kkk');
    
  }
  submitNotes() {
   
    this.apiService.getNotes(this.viewId).subscribe({
      next: (res:any) => {
console.log(res,'oooooooooooo');
        this.notes=res.data[0].notes
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
