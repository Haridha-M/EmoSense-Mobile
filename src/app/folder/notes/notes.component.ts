import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent  implements OnInit {


  notes: string = '';
  @Input() id: any;
  error: any;
  userId:any;
  constructor(private modalCtrl: ModalController,private apiService:ServiceService) {}
  ngOnInit() {
    console.log(this.id,'kkkkkkkkk');
    
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  confirm() {

    console.log(this.notes,'kkk');
    
  }
  isNotesEmpty(): boolean {
    return !this.notes || !this.notes.trim(); // Returns true if notes are empty or contain only whitespace
  }
  isFormValid(): boolean {
    return !this.isNotesEmpty();
  }
  submitNotes() {
    // Check if the form is valid before making the API call
    if (!this.isFormValid()) {
      // Form is not valid, do not proceed with the API call
      return;
    }
  
    this.userId = localStorage.getItem('userId');
    const payload = {
      statusUserId: this.userId,
      notes: this.notes
    };
  
    this.apiService.addNotes(this.id, payload).subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.modalCtrl.dismiss(this.notes);
      },
      error: (err) => {
        console.log('error', err.error);
        this.error = err.error.err; // Set error message
      }
    });
  }
}
